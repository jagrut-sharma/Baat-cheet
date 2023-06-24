import axios from "axios";
import { ACTIONS } from "../utils/constants";

export const getAllPosts = async (token, dataDispatch) => {
  try {
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

    dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: posts });
  } catch (err) {
    console.log(err);
  }
};

export const createNewPost = async (token, dispatch, post) => {
  try {
    const res = await axios.post(
      "https://baatcheet-backend.vercel.app/api/post",
      post,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    getAllPosts(token, dispatch);
  } catch (err) {
    console.log(err);
    const errRes = err?.response?.data?.message ?? "";
    const errMsg = err?.response?.data?.error ?? "";
    console.log(`${err.response.status}:${errRes} ${errMsg}`);
  }
};
