import axios from "axios";
import { baseURL } from "../utils/constants";

export const getAllUsers = async (token) => {
  const res = await axios.get(`${baseURL}/api/user`, {
    headers: {
      Authorization: token,
    },
  });

  const {
    data: { users },
  } = res;

  return users;
};

export const getUserDetails = async (token, userID) => {
  const res = await axios.get(`${baseURL}/api/user/${userID}`, {
    headers: {
      Authorization: token,
    },
  });

  const {
    data: { user },
  } = res;

  return user;
};

export const followUser = async (userID, token) => {
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

  return res;
};

export const unfollowUser = async (userID, token) => {
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

  return res;
};

export const updateProfile = async (token, updates) => {
  const res = await axios.patch(`${baseURL}/api/user/update`, updates, {
    headers: {
      Authorization: token,
    },
  });

  return res;
};
