/* eslint-disable react/prop-types */
import * as Separator from "@radix-ui/react-separator";
import {
  BsBookmark,
  BsHeart,
  BsFillHeartFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
// import { FaRegComment } from "react-icons/fa";

import AvatarEle from "./AvatarEle";
import Dropdown from "./Dropdown";
import { getHumanizeTimeForOlderPost } from "../utils/helperFunctions";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  bookmarkPost,
  dislikePost,
  getAllPosts,
  getBookmarks,
  getLikedPosts,
  getSingleUserPosts,
  likePost,
  unbookmarkPost,
} from "../services/postServices";
import { useData } from "../context/DataContext";
import { getAllUsers, getUserDetails } from "../services/userServices";
import { ACTIONS, errProceedings } from "../utils/constants";

export default function Post({ post, fromProfilePost, fromBookmark }) {
  const { user, token } = useAuth();
  const { dataState, dataDispatch } = useData();
  const [postLoader, setPostLoader] = useState(false);

  let isLiked;

  if (fromProfilePost) {
    const likedArr = post?.likes?.likedBy.map(({ _id }) => _id);
    isLiked = likedArr.includes(user._id);
  } else {
    isLiked = post?.likes?.likedBy.includes(user._id);
  }

  const isBookmarked = dataState.bookmarkedPostsID.includes(post._id);

  const handleLike = async () => {
    try {
      setPostLoader(true);
      let res;

      if (isLiked) {
        res = await dislikePost(token, post._id);
      } else {
        res = await likePost(token, post._id);
      }

      const allPosts = await getAllPosts(token);
      dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
      const likedPosts = getLikedPosts(allPosts, user);
      dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

      if (res.status === 200 && fromProfilePost) {
        const userPosts = await getSingleUserPosts(token, user._id);
        dataDispatch({
          type: ACTIONS.FETCH_PROFILE_POST,
          payload: userPosts,
        });
      }

      if (res.status === 200 && fromBookmark) {
        const fetchedUser = await getUserDetails(token, user._id);
        setPostLoader(true);
        const resArr = await getBookmarks(token);
        dataDispatch({
          type: ACTIONS.FETCH_BOOKMARK_POSTS,
          payload: {
            bookmarksID: fetchedUser.bookmarks,
            bookmarksPost: resArr,
          },
        });
      }
    } catch (error) {
      errProceedings(error);
    } finally {
      setPostLoader(false);
    }
  };

  const handleBookmark = async () => {
    try {
      setPostLoader(true);
      if (isBookmarked) {
        await unbookmarkPost(post._id, token);
      } else {
        await bookmarkPost(post._id, token, dataDispatch, setPostLoader);
        dataDispatch({
          type: ACTIONS.REMOVE_BOOKMARK_POST,
          payload: post._id,
        });
      }

      const allUsers = await getAllUsers(token);
      dataDispatch({ type: ACTIONS.FETCH_ALL_USERS, payload: allUsers });

      const fetchedUser = await getUserDetails(token, user._id);

      const resArr = await getBookmarks(token);
      dataDispatch({
        type: ACTIONS.FETCH_BOOKMARK_POSTS,
        payload: { bookmarksID: fetchedUser.bookmarks, bookmarksPost: resArr },
      });
    } catch (err) {
      errProceedings(err);
    } finally {
      setPostLoader(false);
    }
  };

  return (
    <div
      className={`mb-4 w-[100%] rounded-md border border-gray-200 bg-white pb-2 shadow-md dark:border-gray-600 dark:bg-gray-700 ${
        postLoader ? "cursor-not-allowed" : ""
      }`}
    >
      <div className="mt-1 flex justify-start gap-2 px-4 pt-2.5 text-[1rem] leading-[18px] text-black dark:border-t-gray-600 dark:text-slate-50 md:gap-4">
        {/* <div> */}
        <Link
          to={`/profile/${post.author._id}`}
          className={`flex ${
            postLoader ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <AvatarEle
            imgLink={post.author.pic}
            firstName={post.author.firstName}
            lastName={post.author.lastName}
          />

          <div className="item ml-2 flex flex-col justify-center gap-1 md:ml-0">
            {`${
              post.author.firstName[0].toUpperCase() +
              post.author.firstName.slice(1)
            } ${
              post.author.lastName[0].toUpperCase() +
              post.author.lastName.slice(1)
            }`}
            <span className="text-[small]">{`@${post.author.username}`}</span>
          </div>
        </Link>
        {/* </div> */}

        <div className="mt-[2.5px] hidden md:block">
          <span className="text-[small] text-gray-400">
            {getHumanizeTimeForOlderPost(new Date(), post.createdAt)}
          </span>
        </div>

        {user._id === post.author._id && <Dropdown post={post} />}
      </div>

      <span className="visible self-center px-4 text-[small] text-gray-400 md:hidden">
        {getHumanizeTimeForOlderPost(new Date(), post.createdAt)}
      </span>

      <p className="mt-2 px-4 pb-2 text-base dark:text-slate-50">
        {post.content}
      </p>

      {post.imgURL && (
        <div className="mb-4 flex justify-center">
          <img
            src={post.imgURL}
            alt={`${post.author._id}'s image`}
            className="w-full object-cover px-4"
          />
        </div>
      )}

      <Separator.Root className="self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[100%] data-[orientation=vertical]:w-px dark:bg-gray-500" />

      <div className="flex gap-6 px-4 pt-2 dark:text-slate-50">
        <div className="flex items-center">
          <button
            className={`rounded-full p-2 text-red-600 hover:bg-blue-100 dark:text-red-500 dark:hover:bg-gray-600`}
            onClick={handleLike}
          >
            {isLiked ? (
              <BsFillHeartFill
                size={"1.2rem"}
                className={`${
                  postLoader ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              />
            ) : (
              <BsHeart
                size={"1.2rem"}
                className={`${
                  postLoader ? "cursor-not-allowed" : "cursor-pointer"
                } `}
              />
            )}
          </button>
          <span
            className={`${post.likes.likeCount > 0 ? "visible" : "invisible"}`}
          >
            {post.likes.likeCount}
          </span>
        </div>

        <button
          className="rounded-full p-2 text-blue-700 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          onClick={handleBookmark}
        >
          {isBookmarked ? (
            <BsFillBookmarkFill
              size={"1.2rem"}
              className={`${
                postLoader ? "cursor-not-allowed" : "cursor-pointer"
              } `}
            />
          ) : (
            <BsBookmark
              size={"1.2rem"}
              className={`${
                postLoader ? "cursor-not-allowed" : "cursor-pointer"
              } `}
            />
          )}
        </button>
        {/* <button className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
          <FaRegComment size={"1.2rem"} className="cursor-pointer" />
        </button> */}
      </div>
    </div>
  );
}
