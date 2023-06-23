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
  }
};
