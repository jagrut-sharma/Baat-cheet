import axios from "axios";
import { toast } from "react-toastify";
import { baseURL, toastConfig } from "../utils/constants";

export const loginHandler = async (loginURL, formValue) => {
  const res = await axios.post(loginURL, formValue);

  const {
    data: { token },
  } = res;

  return token;
};

export const signupHandler = async (loginURL, formValue) => {
  await axios.post(loginURL, formValue);
  loginURL = `${baseURL}/api/auth/signin`;
  const token = await loginHandler(loginURL, formValue);
  return token;
};

export const logoutHandler = (setToken, setUser) => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast.info("Logged out", toastConfig);
};
