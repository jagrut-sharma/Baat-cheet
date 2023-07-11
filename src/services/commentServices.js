import axios from "axios";
import { baseURL } from "../utils/constants";

export const addComment = async (postID, token, comment) => {
  await axios.post(
    `${baseURL}/api/post/comment/${postID}`,
    {
      comment: comment,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const deleteComment = async (token, postID, commentID) => {
  const res = await axios.post(
    `${baseURL}/api/post/comment/delete-comment`,
    {
      postId: postID,
      commentId: commentID,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return res;
};

export const editComment = async (postID, commentID, token, comment) => {
  const res = await axios.patch(
    `${baseURL}/api/post/comment/${postID}`,
    {
      commentId: commentID,
      comment: comment,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return res;
};
