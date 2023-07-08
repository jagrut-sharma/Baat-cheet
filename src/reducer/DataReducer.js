import { ACTIONS } from "../utils/constants";

export const initialData = {
  allUsers: [],
  allPosts: [],
  profilePosts: [],
  userPosts: [],
  profileDetails: null,
  likedPosts: [],
  bookmarkedPosts: [],
  bookmarkedPostsID: [],
  singlePostDetail: null,
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

    case ACTIONS.INITIALIZE_BOOKMARK_ID: {
      draft.bookmarkedPostsID = action.payload;
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
      draft.profilePosts = draft.profilePosts.map((post) =>
        post._id === newPost._id ? newPost : post
      );
      draft.likedPosts = draft.likedPosts.map((post) =>
        post._id === newPost._id ? newPost : post
      );
      draft.bookmarkedPosts = draft.bookmarkedPosts.map((post) =>
        post._id === newPost._id ? newPost : post
      );
      draft.singlePostDetail = action.payload;
      break;
    }

    case ACTIONS.DELETE_POST: {
      const postID = action.payload;
      draft.allPosts = draft.allPosts.filter((post) => post._id !== postID);
      draft.profilePosts = draft.profilePosts.filter(
        (post) => post._id !== postID
      );
      draft.bookmarkedPosts = draft.bookmarkedPosts.filter(
        (post) => post._id !== postID
      );
      if (postID === draft.singlePostDetail._id) {
        draft.singlePostDetail = null;
      }
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

    case ACTIONS.FETCH_BOOKMARK_POSTS: {
      draft.bookmarkedPosts = action.payload.bookmarksPost;
      draft.bookmarkedPostsID = action.payload.bookmarksID;
      break;
    }

    case ACTIONS.REMOVE_BOOKMARK_POST: {
      draft.bookmarkedPosts = draft.bookmarkedPosts.filter(
        ({ _id }) => _id !== action.payload
      );
      break;
    }

    case ACTIONS.EDIT_PROFILE: {
      const newAuthor = {
        _id: action.payload._id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        pic: action.payload.pic,
      };

      draft.profilePosts = draft.profilePosts.map((post) => ({
        ...post,
        author: newAuthor,
      }));
      break;
    }

    case ACTIONS.USER_FOLLOW_UNFOLLOW: {
      draft.profileDetails = action.payload;
      break;
    }

    case ACTIONS.FETCH_SINGLE_POST: {
      draft.singlePostDetail = action.payload;
      break;
    }

    default:
      break;
  }
};
