import { ACTIONS } from "../utils/constants";

export const initialData = {
  allUsers: [],
  allPosts: [],
};

export const dataReducer = (draft, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_USERS: {
      draft.allUsers = action.payload;
      break;
    }

    case ACTIONS.FETCH_ALL_POSTS: {
      draft.allPosts = action.payload;
      break;
    }

    case ACTIONS.EDIT_POST: {
      const newPost = action.payload;
      draft.allPosts = draft.allPosts.map((post) =>
        post._id === newPost._id ? newPost : post
      );
      break;
    }

    case ACTIONS.DELETE_POST: {
      const postID = action.payload;
      draft.allPosts = draft.allPosts.filter((post) => post._id !== postID);
      break;
    }

    default:
      break;
  }
};
