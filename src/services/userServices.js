import axios from "axios";
import { ACTIONS } from "../utils/constants";

export const getAllUsers = async (token, dataDispatch, setLoader) => {
  try {
    if (setLoader) {
      setLoader(true);
    }
    const res = await axios.get(
      "https://baatcheet-backend.vercel.app/api/user",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const {
      data: { users },
    } = res;

    if (setLoader) {
      setLoader(false);
    }
    dataDispatch({ type: ACTIONS.FETCH_ALL_USERS, payload: users });
  } catch (err) {
    setLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const getUserDetails = async (
  token,
  userID,
  dispatch,
  setProfileLoader
) => {
  try {
    setProfileLoader(true);
    const res = await axios.get(
      `https://baatcheet-backend.vercel.app/api/user/${userID}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const {
      data: { user },
    } = res;

    setProfileLoader(false);
    return user;
  } catch (err) {
    setProfileLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};
