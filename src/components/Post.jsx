/* eslint-disable react/prop-types */
import * as Separator from "@radix-ui/react-separator";
import { BsBookmark, BsHeart, BsFillHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

import AvatarEle from "./AvatarEle";
import Dropdown from "./Dropdown";
import { getHumanizeTimeForOlderPost } from "../utils/helperFunctions";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { dislikePost, likePost } from "../services/postServices";
import { useData } from "../context/DataContext";

export default function Post({ post }) {
  const { user, token } = useAuth();
  const { dataDispatch } = useData();
  const [postLoader, setPostLoader] = useState(false);

  const isLiked = post?.likes?.likedBy.includes(user._id);

  const handleLike = () => {
    if (isLiked) {
      dislikePost(token, post._id, setPostLoader, user, dataDispatch);
    } else {
      likePost(token, post._id, setPostLoader, user, dataDispatch);
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
        <button
          className={`rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600`}
          onClick={handleLike}
        >
          {isLiked ? (
            <BsFillHeartFill
              size={"1.2rem"}
              color="#dc2626"
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
        <button className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
          <BsBookmark size={"1.2rem"} className="cursor-pointer" />
        </button>
        <button className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
          <FaRegComment size={"1.2rem"} className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
