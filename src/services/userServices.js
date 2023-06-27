import axios from "axios";
import { ACTIONS } from "../utils/constants";

export const getAllUsers = async (token, dataDispatch) => {
  try {
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

    dataDispatch({ type: ACTIONS.FETCH_ALL_USERS, payload: users });
  } catch (err) {
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
    dispatch({ type: ACTIONS.FETCH_PROFILE_DETAILS, payload: user });
  } catch (err) {
    setProfileLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};
