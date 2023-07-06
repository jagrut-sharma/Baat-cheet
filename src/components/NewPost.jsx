/* eslint-disable react/prop-types */
import { useState } from "react";
import AvatarEle from "./AvatarEle";
import { BsFillImageFill } from "react-icons/bs";
import {
  createNewPost,
  getAllPosts,
  getLikedPosts,
} from "../services/postServices";
import { useMedia } from "../hooks/useMedia";
import { ClipLoader } from "react-spinners";
import EmojiPopover from "./EmojiPopover";
import { ACTIONS } from "../utils/constants";

export default function NewPost({ user, token, dataDispatch }) {
  const [post, setPost] = useState("");
  const [loader, setLoader] = useState(false);
  const [postPic, setPostPic] = useState("");
  const [imgLoader, setImgLoader] = useState(false);
  const { uploadMedia } = useMedia();

  const handleNewPost = async (e) => {
    setLoader(true);
    e.preventDefault();
    const postDetails = {
      content: post,
      imgURL: postPic,
    };
    await createNewPost(token, postDetails);

    const allPosts = await getAllPosts(token);
    dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });

    const likedPosts = getLikedPosts(allPosts, user);
    dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

    setPost("");
    setPostPic("");
    setLoader(false);
  };

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  const handleImageUpload = async (e) => {
    setImgLoader(true);
    const file = e.target.files[0];
    await uploadMedia(file, (url) => setPostPic(url));
    setImgLoader(false);
    e.target.value = null;
  };

  const handleRemoveImage = () => {
    setPostPic("");
  };

  const addEmoji = (emojiData) => {
    setPost((prev) => prev + emojiData.emoji);
    console.log(post + emojiData.emoji);
  };

  return (
    <form className="mb-4 rounded-md border border-gray-300 bg-gray-50 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <div className="border-b border-b-gray-300 dark:border-b-gray-500">
        <div className="flex">
          <div className="m-2">
            <AvatarEle
              imgLink={user?.pic}
              firstName={user?.firstName}
              lastName={user?.lastName}
              isProfile
            />
          </div>

          <textarea
            name="post"
            placeholder="What's up?"
            id="post"
            cols="30"
            rows="8"
            className={`w-full resize-none bg-gray-50 p-2 font-OpenSans outline-none disabled:cursor-not-allowed dark:bg-gray-700 dark:text-slate-50`}
            value={post}
            onChange={handleChange}
            disabled={loader}
          ></textarea>
        </div>

        {imgLoader && <ClipLoader color="#3b82f6" className="mb-2 ml-4" />}

        {postPic && (
          <div className="mb-2 ml-4 w-[8rem]">
            <img src={postPic} className="object-contain" />
            <button className="w-full bg-gray-300" onClick={handleRemoveImage}>
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="ml-4 flex items-center gap-4">
          <div className="rounded-full hover:bg-blue-200">
            <label
              htmlFor="pic"
              className="block cursor-pointer rounded-full p-2 text-blue-700 dark:text-blue-500"
            >
              <BsFillImageFill size={"1.2rem"} />
            </label>
            <input
              type="file"
              name="pic"
              id="pic"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <EmojiPopover handleEmojiClick={addEmoji} />
        </div>
        <button
          onClick={handleNewPost}
          className="m-2 rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:opacity-80"
          disabled={post.length === 0 || loader}
        >
          Post
        </button>
      </div>
    </form>
  );
}
