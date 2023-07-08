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
