import axios from "axios";
import { ACTIONS, baseURL, toastConfig } from "../utils/constants";
import { toast } from "react-toastify";

export const getAllUsers = async (token, dataDispatch, setLoader) => {
  try {
    if (setLoader) {
      setLoader(true);
    }
    const res = await axios.get(`${baseURL}/api/user`, {
      headers: {
        Authorization: token,
      },
    });

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
    const res = await axios.get(`${baseURL}/api/user/${userID}`, {
      headers: {
        Authorization: token,
      },
    });

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

export const followUser = async (
  userID,
  token,
  dispatch,
  setLoader,
  loggeduserID,
  setUser
) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/user/follow`,
      {
        followId: userID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.status === 200) {
      // test
      const resUser = await getUserDetails(
        token,
        loggeduserID,
        dispatch,
        setLoader
      );
      setUser(resUser);
      localStorage.setItem("user", JSON.stringify(resUser));
    }
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const unfollowUser = async (
  userID,
  token,
  dispatch,
  setLoader,
  loggeduserID,
  setUser
) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/user/unfollow`,
      {
        unfollowId: userID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.status === 200) {
      // test
      const resUser = await getUserDetails(
        token,
        loggeduserID,
        dispatch,
        setLoader
      );
      setUser(resUser);
      localStorage.setItem("user", JSON.stringify(resUser));
    }
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const updateProfile = async (token, updates, setLoader) => {
  try {
    const res = await axios.patch(`${baseURL}/api/user/update`, updates, {
      headers: {
        Authorization: token,
      },
    });

    console.log(updates);

    return res;
    // need to update user => profile
    // need to update user profile description and all posts to reflect changes in profile pic
  } catch (err) {
    setLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
    toast.error("Some error occured, Try again", toastConfig);
  }
};
