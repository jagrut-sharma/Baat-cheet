import axios from "axios";
import { ACTIONS, baseURL } from "../utils/constants";
import { getAllUsers } from "./userServices";

export const getAllPosts = async (token) => {
  const res = await axios.get(`${baseURL}/api/post`, {
    headers: {
      Authorization: token,
    },
  });

  const {
    data: { posts },
  } = res;

  return posts;
};

export const createNewPost = async (token, dispatch, post, user, profileID) => {
  try {
    await axios.post(`${baseURL}/api/post`, post, {
      headers: {
        Authorization: token,
      },
    });

    const allPosts = await getAllPosts(token);
    dispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
    const likedPosts = getLikedPosts(allPosts, user);
    dispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

    if (profileID === user._id) {
      getSingleUserPosts(token, user._id, dispatch);
    }
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err.response.status}:${errRes} ${errMsg}`);
  }
};

export const editPost = async (
  token,
  dataDispatch,
  postDetails,
  postID,
  post
) => {
  try {
    await axios.patch(`${baseURL}/api/post/${postID}`, postDetails, {
      headers: {
        Authorization: token,
      },
    });

    dataDispatch({ type: ACTIONS.EDIT_POST, payload: post });
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const deletePost = async (token, dataDispatch, postID) => {
  try {
    const res = await axios.delete(`${baseURL}/api/post/${postID}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);

    dataDispatch({ type: ACTIONS.DELETE_POST, payload: postID });
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const getSingleUserPosts = async (
  token,
  userID,
  dispatch,
  setProfileLoader,
  isUser
) => {
  try {
    if (setProfileLoader) {
      setProfileLoader(true);
    }
    const res = await axios.get(`${baseURL}/api/user/all-posts/${userID}`, {
      headers: {
        Authorization: token,
      },
    });

    if (setProfileLoader) {
      setProfileLoader(false);
    }
    const {
      data: { posts },
    } = res;

    dispatch({
      type: isUser ? ACTIONS.FETCH_USER_POSTS : ACTIONS.FETCH_PROFILE_POST,
      payload: posts,
    });
  } catch (err) {
    if (setProfileLoader) {
      setProfileLoader(false);
    }
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const getLikedPosts = (allPosts, user) => {
  const userID = user._id;
  const likedPosts = allPosts.filter((post) =>
    post.likes.likedBy.includes(userID)
  );
  return likedPosts;
};

export const likePost = async (
  token,
  postID,
  setPostLoader,
  user,
  dispatch
) => {
  try {
    setPostLoader(true);
    const res = await axios.post(
      `${baseURL}/api/post/like`,
      {
        postId: postID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const allPosts = await getAllPosts(token);
    dispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
    const likedPosts = getLikedPosts(allPosts, user);
    dispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

    return res;
  } catch (err) {
    setPostLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const dislikePost = async (
  token,
  postID,
  setPostLoader,
  user,
  dispatch
) => {
  try {
    setPostLoader(true);
    const res = await axios.post(
      `${baseURL}/api/post/dislike`,
      {
        postId: postID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const allPosts = await getAllPosts(token);
    dispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
    const likedPosts = getLikedPosts(allPosts, user);
    dispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

    return res;
  } catch (err) {
    setPostLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const bookmarkPost = async (postID, token, dispatch, setPostLoader) => {
  try {
    setPostLoader(true);
    await axios.post(
      `${baseURL}/api/post/bookmark/${postID}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const allUsers = await getAllUsers(token);
    dispatch({ type: ACTIONS.FETCH_ALL_USERS, payload: allUsers });
    setPostLoader(false);
  } catch (err) {
    setPostLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const unbookmarkPost = async (
  postID,
  token,
  dispatch,
  setPostLoader
) => {
  try {
    setPostLoader(true);
    await axios.delete(`${baseURL}/api/post/bookmark/${postID}`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ACTIONS.REMOVE_BOOKMARK_POST,
      payload: postID,
    });

    const allUsers = await getAllUsers(token);
    dispatch({ type: ACTIONS.FETCH_ALL_USERS, payload: allUsers });
    setPostLoader(false);
  } catch (err) {
    setPostLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

export const getBookmarks = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/post/bookmark`, {
      headers: {
        Authorization: token,
      },
    });

    const {
      data: { bookmarks },
    } = res;

    return bookmarks;
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};
