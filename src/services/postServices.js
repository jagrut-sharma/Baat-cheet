import axios from "axios";
import { baseURL } from "../utils/constants";

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

export const createNewPost = async (token, post) => {
  await axios.post(`${baseURL}/api/post`, post, {
    headers: {
      Authorization: token,
    },
  });
};

export const editPost = async (token, postDetails, postID) => {
  await axios.patch(`${baseURL}/api/post/${postID}`, postDetails, {
    headers: {
      Authorization: token,
    },
  });
};

export const deletePost = async (token, postID) => {
  await axios.delete(`${baseURL}/api/post/${postID}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getSingleUserPosts = async (token, userID) => {
  const res = await axios.get(`${baseURL}/api/user/all-posts/${userID}`, {
    headers: {
      Authorization: token,
    },
  });

  const {
    data: { posts },
  } = res;

  return posts;
};

export const getLikedPosts = (allPosts, user) => {
  const userID = user._id;
  const likedPosts = allPosts.filter((post) =>
    post.likes.likedBy.includes(userID)
  );
  return likedPosts;
};

export const likePost = async (token, postID) => {
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

  return res;
};

export const dislikePost = async (token, postID) => {
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

  return res;
};

export const bookmarkPost = async (postID, token) => {
  await axios.post(
    `${baseURL}/api/post/bookmark/${postID}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const unbookmarkPost = async (postID, token) => {
  await axios.delete(`${baseURL}/api/post/bookmark/${postID}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getBookmarks = async (token) => {
  const res = await axios.get(`${baseURL}/api/post/bookmark`, {
    headers: {
      Authorization: token,
    },
  });

  const {
    data: { bookmarks },
  } = res;

  return bookmarks;
};
