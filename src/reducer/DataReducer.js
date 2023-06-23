import { ACTIONS } from "../utils/constants";

export const initialData = {
  allUsers: [],
  allPosts: [],
};

export const dataReducer = (draft, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_USERS:
      draft.allUsers = action.payload;
      break;

    case ACTIONS.FETCH_ALL_POSTS:
      draft.allPosts = action.payload;
      break;

    default:
      break;
  }
};
