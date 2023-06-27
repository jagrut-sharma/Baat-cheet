import { ACTIONS } from "../utils/constants";

export const initialData = {
  allUsers: [],
  allPosts: [],
  profilePosts: [],
  userPosts: [],
  profileDetails: null,
  likedPosts: [],
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
      draft.userPosts = draft.userPosts.map((post) =>
        post._id === newPost._id ? newPost : post
      );
      break;
    }

    case ACTIONS.DELETE_POST: {
      const postID = action.payload;
      draft.allPosts = draft.allPosts.filter((post) => post._id !== postID);
      break;
    }

    case ACTIONS.FETCH_USER_POSTS: {
      draft.userPosts = action.payload;
      break;
    }

    case ACTIONS.FETCH_PROFILE_POST: {
      draft.profilePosts = action.payload;
      break;
    }

    case ACTIONS.FETCH_PROFILE_DETAILS: {
      draft.profileDetails = action.payload;
      break;
    }

    case ACTIONS.ADD_LIKED_POST: {
      draft.likedPosts = action.payload;
      break;
    }

    case ACTIONS.LIKE_POST: {
      draft.likedPosts.push(action.payload);
      break;
    }

    default:
      break;
  }
};
