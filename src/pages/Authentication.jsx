import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import Nav from "../components/Nav";
import { loginHandler, signupHandler } from "../services/authServices";

export default function Authentication() {
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const { token, setAuthLoader, authLoader, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = searchParams.get("mode") || "signin";
  const baseURL = `https://baatcheet-backend.vercel.app/api/auth/${mode}`;

  const redirectPath = location.state?.path || "/";

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

  const handleFormSubmit = (formValue) => {
    if (mode === "register") {
      signupHandler(
        setAuthLoader,
        navigate,
        baseURL,
        redirectPath,
        formValue,
        setToken,
        setUser
      );
    } else {
      loginHandler(
        setAuthLoader,
        navigate,
        baseURL,
        redirectPath,
        formValue,
        setToken,
        setUser
      );
    }
  };

  return (
    <>
      {token ? (
        <Navigate to={redirectPath} />
      ) : (
        <div className="grid min-h-[100dvh] grid-rows-rootLayout bg-gray-200 font-OpenSans dark:bg-gray-800">
          <Nav theme={theme} setTheme={setTheme} login />
          <AuthForm
            handleFormSubmit={handleFormSubmit}
            err={error}
            setErr={setError}
            loader={authLoader}
          />
        </div>
      )}
    </>
  );
}
