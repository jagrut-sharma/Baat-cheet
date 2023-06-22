import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/constants";

export const loginHandler = async (
  setAuthLoader,
  baseURL,
  formValue,
  setToken,
  setUser,
  setButtonLoader,
  isRegister
) => {
  try {
    setAuthLoader(true);
    const res = await axios.post(baseURL, formValue);

    const {
      data: { token },
    } = res;
    const { _id: userID } = jwt_decode(token);

    setToken(token);
    localStorage.setItem("token", token);

    const userRes = await axios.get(
      `https://baatcheet-backend.vercel.app/api/user/${userID}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const {
      data: { user },
    } = userRes;

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    if (isRegister) {
      toast.success("Registered User", toastConfig);
    } else {
      toast.success("Logged In", toastConfig);
    }

    setAuthLoader(false);
    setButtonLoader({
      login: false,
      guest: false,
      register: false,
    });
  } catch (err) {
    setAuthLoader(false);
    setButtonLoader({
      login: false,
      guest: false,
      register: false,
    });
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err.response.status}:${errRes} ${errMsg}`);
    toast.error(`${err.response.status}:${errRes} ${errMsg}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const signupHandler = async (
  setAuthLoader,
  baseURL,
  formValue,
  setToken,
  setUser,
  setButtonLoader
) => {
  try {
    setAuthLoader(true);
    const registerRes = await axios.post(baseURL, formValue);
    console.log(registerRes);
    baseURL = "https://baatcheet-backend.vercel.app/api/auth/signin";

    loginHandler(
      setAuthLoader,
      baseURL,
      formValue,
      setToken,
      setUser,
      setButtonLoader,
      true
    );
  } catch (error) {
    setAuthLoader(false);
    console.log(error);
    const errRes = error?.response?.data?.message ?? "";
    const errMsg = error?.response?.data?.error ?? "";
    console.log(`${error?.response?.status}:${errMsg} ${errRes}`);
    toast.error(`${error?.response?.status}:${errMsg} ${errRes}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const logoutHandler = (setToken, setUser) => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast.info("Logged out", toastConfig);
};
