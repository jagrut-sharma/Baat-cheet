export const ACTIONS = {
  FETCH_ALL_USERS: "FETCH ALL USERS",
  FETCH_ALL_POSTS: "FETCH ALL POSTS",
  EDIT_POST: "EDIT POST",
  DELETE_POST: "DELETE POST",
  FETCH_USER_POSTS: "FETCH USER POSTS",
  FETCH_PROFILE_POST: "FETCH PROFILE POSTS",
  FETCH_PROFILE_DETAILS: "FETCH PROFILE DETAILS",
  ADD_LIKED_POST: "ADD LIKED POST",
  LIKE_POST: "LIKE POST",
  FETCH_BOOKMARK_POSTS: "FETCH BOOKMARK POST",
  REMOVE_BOOKMARK_POST: "REMOVE BOOKMARK POST",
  EDIT_PROFILE: "EDIT PROFILE",
  USER_FOLLOW_UNFOLLOW: "USER FOLLOW AND UNFOLLOW",
  INITIALIZE_BOOKMARK_ID: "INITIALIZE BOOKMARK IDS",
  FETCH_SINGLE_POST: "FETCH SINGLE POST",
};

export const guestUser = {
  email: "random@gmail.com",
  password: "random",
};

export const toastConfig = {
  position: "bottom-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const errorToastConfig = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const baseURL = "https://baatcheet-backend.vercel.app";

export const avatarList = [
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213821/Avatars/Avatar-1_xnsy6r.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213821/Avatars/Avatar-2_l8vppk.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213821/Avatars/Avatar-3_brd6am.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213821/Avatars/Avatar-4_ttmlru.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213822/Avatars/Avatar-5_edgeri.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213821/Avatars/Avatar-6_nsv5eq.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213822/Avatars/Avatar-7_k0hkhf.png",
  "https://res.cloudinary.com/drehkcoil/image/upload/v1688213821/Avatars/Avatar-8_eagm9i.png",
];

export const errProceedings = (err) => {
  console.log(err);
  const errRes = err?.response?.data?.message ?? "";
  const errMsg = err?.response?.data?.error ?? "";
  console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
};
