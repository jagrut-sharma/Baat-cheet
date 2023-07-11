/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsFillImageFill, BsFillPlusCircleFill } from "react-icons/bs";
import AvatarEle from "./AvatarEle";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import {
  createNewPost,
  editPost,
  getAllPosts,
  getLikedPosts,
  getSingleUserPosts,
} from "../services/postServices";
import { useMedia } from "../hooks/useMedia";
import { ClipLoader } from "react-spinners";
import EmojiPopover from "./EmojiPopover";
import { useParams } from "react-router-dom";
import { ACTIONS, errProceedings, errorToastConfig } from "../utils/constants";
import { toast } from "react-toastify";

export default function Modal({ isOpen, setIsOpen, isEditing, contents }) {
  const [post, setPost] = useState(contents?.content || "");
  const [postPic, setPostPic] = useState(contents?.imgURL || "");
  const [loader, setLoader] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const { dataDispatch } = useData();
  const { token, user } = useAuth();
  const { uploadMedia } = useMedia();
  const { userID } = useParams();

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      if (post.trim().length === 0) {
        toast.error("Enter text to make post", errorToastConfig);
        setLoader(false);
        setPost("");
        return;
      }

      const postDetails = {
        content: post,
        imgURL: postPic,
      };
      await createNewPost(token, postDetails);

      const allPosts = await getAllPosts(token);
      dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
      const likedPosts = getLikedPosts(allPosts, user);
      dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

      if (userID === user._id) {
        const userPosts = await getSingleUserPosts(token, user._id);
        dataDispatch({
          type: ACTIONS.FETCH_PROFILE_POST,
          payload: userPosts,
        });
      }

      setPost("");
      setPostPic("");
      closeModal();
    } catch (err) {
      errProceedings(err);
    } finally {
      setLoader(false);
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      if (post.trim().length === 0) {
        toast.error("Enter text to make post", errorToastConfig);
        setLoader(false);
        setPost("");
        return;
      }

      const postID = contents._id;
      const postDetails = {
        content: post,
        imgURL: postPic,
      };
      const newContent = { ...contents, content: post, imgURL: postPic };
      await editPost(token, postDetails, postID);
      dataDispatch({ type: ACTIONS.EDIT_POST, payload: newContent });

      const allPosts = await getAllPosts(token);
      dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
      const likedPosts = getLikedPosts(allPosts, user);
      dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });

      setPost(post);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      const errRes = err?.response?.data?.message ?? "";
      const errMsg = err?.response?.data?.error ?? "";
      console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  function closeModal() {
    setPost(contents?.content || "");
    setPostPic(contents?.imgURL || "");
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
    <>
      <div
        className={`h-full w-[3rem] self-center md:order-1 md:h-max ${
          isEditing ? "md:w-full" : ""
        } md:self-start`}
      >
        {isEditing ? (
          ""
        ) : (
          <button
            type="button"
            onClick={openModal}
            className={
              "flex h-full w-[3rem] items-center justify-center rounded-md px-2 py-1 text-base font-bold md:w-max md:hover:bg-blue-200 md:dark:hover:bg-slate-500"
            }
          >
            <BsFillPlusCircleFill
              size={"1.1rem"}
              className="text-blue-700 dark:text-blue-500 md:mr-2"
            />
            <span className="hidden md:block">Create Post</span>
          </button>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* The backdrop, rendered as a fixed sibling to the panel container */}

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* The backdrop, rendered as a fixed sibling to the panel container */}
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                aria-hidden="true"
              />
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="fixed left-[50%] top-[20%] w-full max-w-md translate-x-[-50%] transform overflow-hidden rounded-lg bg-gray-50 text-left align-middle transition-all dark:bg-gray-600">
                  <Dialog.Title
                    as="h3"
                    className="p-3 py-2 text-lg font-medium leading-6 text-gray-900 dark:text-slate-50"
                  >
                    {isEditing ? "Edit Post" : "New Post"}
                  </Dialog.Title>
                  <div className="">
                    <form className="rounded-md bg-gray-50 dark:bg-gray-600">
                      <div className=" border-b border-b-gray-300 dark:border-b-gray-500">
                        <div className="flex">
                          <div className="m-2">
                            <AvatarEle
                              imgLink={user?.pic}
                              firstName={user?.firstName}
                              lastName={user?.lastName}
                            />
                          </div>

                          <textarea
                            name="post"
                            placeholder="What's up?"
                            id="post"
                            cols="30"
                            rows="8"
                            className="w-full resize-none bg-gray-50 p-3 font-OpenSans outline-none disabled:cursor-not-allowed dark:bg-gray-600 dark:text-slate-50"
                            value={post}
                            onChange={handleChange}
                            disabled={loader}
                          ></textarea>
                        </div>

                        {imgLoader && (
                          <ClipLoader color="#3b82f6" className="mb-2 ml-4" />
                        )}

                        {postPic && (
                          <div className="mb-2 ml-4 w-[8rem]">
                            <img src={postPic} className="object-contain" />
                            <button
                              className="w-full bg-gray-300"
                              onClick={handleRemoveImage}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="ml-4 flex items-center gap-4">
                          <div className="rounded-full hover:bg-blue-200">
                            <label
                              htmlFor="picMod"
                              className="block cursor-pointer rounded-full p-2 text-blue-700 dark:text-blue-500"
                            >
                              <BsFillImageFill size={"1.2rem"} />
                            </label>
                            <input
                              type="file"
                              name="picMod"
                              id="picMod"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </div>

                          <EmojiPopover handleEmojiClick={addEmoji} />
                        </div>

                        <button
                          onClick={contents ? handleEditPost : handleNewPost}
                          className="m-2 rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
                          disabled={post.length === 0 || loader}
                        >
                          {contents ? "Save" : "Post"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
