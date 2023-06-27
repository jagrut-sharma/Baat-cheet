import axios from "axios";
import { ACTIONS } from "../utils/constants";

export const getAllPosts = async (token, dataDispatch, user, setLoader) => {
  try {
    if (setLoader) {
      setLoader(true);
    }
    const res = await axios.get(
      "https://baatcheet-backend.vercel.app/api/post",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const {
      data: { posts },
    } = res;

    if (setLoader) {
      setLoader(false);
    }
    dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: posts });
    getLikedPosts(posts, dataDispatch, user);
  } catch (err) {
    console.log(err);
  }
};

export const createNewPost = async (token, dispatch, post, user) => {
  try {
    await axios.post("https://baatcheet-backend.vercel.app/api/post", post, {
      headers: {
        Authorization: token,
      },
    });

    getAllPosts(token, dispatch, user);
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
    await axios.patch(
      `https://baatcheet-backend.vercel.app/api/post/${postID}`,
      postDetails,
      {
        headers: {
          Authorization: token,
        },
      }
    );

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
    const res = await axios.delete(
      `https://baatcheet-backend.vercel.app/api/post/${postID}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
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
    setProfileLoader(true);
    const res = await axios.get(
      `https://baatcheet-backend.vercel.app/api/user/all-posts/${userID}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setProfileLoader(false);
    const {
      data: { posts },
    } = res;

    dispatch({
      type: isUser ? ACTIONS.FETCH_USER_POSTS : ACTIONS.FETCH_PROFILE_POST,
      payload: posts,
    });
  } catch (err) {
    setProfileLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};

const getLikedPosts = (allPosts, dispatch, user) => {
  const userID = user._id;
  const likedPosts = allPosts.filter((post) =>
    post.likes.likedBy.includes(userID)
  );
  dispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });
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
    await axios.post(
      "https://baatcheet-backend.vercel.app/api/post/like",
      {
        postId: postID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setPostLoader(false);
    getAllPosts(token, dispatch, user, setPostLoader);
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
    await axios.post(
      "https://baatcheet-backend.vercel.app/api/post/dislike",
      {
        postId: postID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setPostLoader(false);
    getAllPosts(token, dispatch, user, setPostLoader);
  } catch (err) {
    setPostLoader(false);
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
  }
};
