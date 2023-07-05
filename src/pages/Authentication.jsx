import { useEffect, useState } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import Nav from "../components/Nav";
import { loginHandler, signupHandler } from "../services/authServices";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { errorToastConfig, toastConfig } from "../utils/constants";
import { getUserDetails } from "../services/userServices";

export default function Authentication() {
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [buttonLoader, setButtonLoader] = useImmer({
    login: false,
    guest: false,
    register: false,
  });

  const { token, setAuthLoader, authLoader, setToken, setUser, hasLoggedOut } =
    useAuth();
  // const navigate = useNavigate();
  const location = useLocation();

  const mode = searchParams.get("mode") || "signin";
  const baseURL = `https://baatcheet-backend.vercel.app/api/auth/${mode}`;

  const redirectPath = location.state?.path || "/";
  // console.log(hasLoggedOut);
  const newRedirect = hasLoggedOut ? "/" : redirectPath;
  // console.log(newRedirect);

  //onMount theme check
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (theme === "dark" || (!theme && userPrefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Manual theme switcher:
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleFormSubmit = async (formValue) => {
    try {
      setAuthLoader(true);
      let token;
      if (mode === "register") {
        token = await signupHandler(baseURL, formValue);
      } else {
        token = await loginHandler(baseURL, formValue);
      }

      const { _id: userID } = jwt_decode(token);

      const userRes = await getUserDetails(token, userID);

      setUser(userRes);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(userRes));
      localStorage.setItem("token", token);

      if (mode === "register") {
        toast.success("Registered User", toastConfig);
      } else {
        toast.success("Logged In", toastConfig);
      }
    } catch (err) {
      console.log(err);
      const errRes = err?.response?.data?.message ?? "";
      const errMsg = err?.response?.data?.error ?? "";
      console.log(`${err.response.status}:${errRes} ${errMsg}`);
      toast.error(`${errRes} ${errMsg}`, errorToastConfig);
    } finally {
      setAuthLoader(false);
      setButtonLoader({
        login: false,
        guest: false,
        register: false,
      });
    }
  };

  return (
    <>
      {token ? (
        <Navigate to={newRedirect} />
      ) : (
        <div className="grid min-h-[100dvh] grid-rows-rootLayout bg-gray-200 font-OpenSans dark:bg-gray-800">
          <Nav theme={theme} setTheme={setTheme} login />
          <AuthForm
            handleFormSubmit={handleFormSubmit}
            err={error}
            setErr={setError}
            loader={authLoader}
            buttonLoader={buttonLoader}
            setButtonLoader={setButtonLoader}
          />
        </div>
      )}
    </>
  );
}
