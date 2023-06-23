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
