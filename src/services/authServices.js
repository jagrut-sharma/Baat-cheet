import axios from "axios";
import jwt_decode from "jwt-decode";

export const loginHandler = async (
  setAuthLoader,
  navigate,
  baseURL,
  redirectPath,
  formValue,
  setToken,
  setUser
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

    setAuthLoader(false);
  } catch (err) {
    setAuthLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err.response.status}:${errRes} ${errMsg}`);
  }
};

export const signupHandler = async (
  setAuthLoader,
  navigate,
  baseURL,
  redirectPath,
  formValue,
  setToken,
  setUser
) => {
  try {
    setAuthLoader(true);
    const registerRes = await axios.post(baseURL, formValue);
    console.log(registerRes);
    baseURL = "https://baatcheet-backend.vercel.app/api/auth/signin";

    loginHandler(
      setAuthLoader,
      navigate,
      baseURL,
      redirectPath,
      formValue,
      setToken,
      setUser
    );
  } catch (error) {
    setAuthLoader(false);
    console.log(error);
    const errRes = error?.response?.data?.message ?? "";
    const errMsg = error?.response?.data?.error ?? "";
    console.log(`${error?.response?.status}:${errMsg} ${errRes}`);
  }
};

export const logoutHandler = (setToken, setUser) => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
