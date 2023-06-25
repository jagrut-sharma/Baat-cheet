/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  BsFillEmojiHeartEyesFill,
  BsFillImageFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import AvatarEle from "./AvatarEle";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { createNewPost, editPost } from "../services/postServices";

export default function Modal({ isOpen, setIsOpen, isEditing, contents }) {
  const [post, setPost] = useState(contents?.content || "");
  const { dataDispatch } = useData();
  const { token, user } = useAuth();

  const handleNewPost = (e) => {
    e.preventDefault();
    const postDetails = {
      content: post,
    };
    createNewPost(token, dataDispatch, postDetails);
    setPost("");
    closeModal();
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    console.log("Editing");
    const postID = contents._id;
    const postDetails = {
      content: post,
    };
    const newContent = { ...contents, content: post };
    await editPost(token, dataDispatch, postDetails, postID, newContent);
    setPost(post);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  function closeModal() {
    setPost(contents?.content || "");
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // console.log(contents);

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-700">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-50"
                  >
                    {isEditing ? "Edit Post" : "New Post"}
                  </Dialog.Title>
                  <div className="mt-4">
                    <form className="mb-4 rounded-md border border-gray-300 bg-gray-50 shadow-md dark:border-gray-600 dark:bg-gray-600">
                      <div className="flex border-b border-b-gray-300 dark:border-b-gray-500">
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
                          className="w-full resize-none bg-gray-50 p-3 font-OpenSans outline-none dark:bg-gray-600 dark:text-slate-50"
                          value={post}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="ml-4 flex gap-4">
                          <button
                            type="button"
                            className="rounded-full p-2 text-blue-700 hover:bg-blue-200 dark:text-blue-500"
                          >
                            <BsFillImageFill size={"1.2rem"} />
                          </button>
                          <button
                            type="button"
                            className="rounded-full p-2 text-orange-400 hover:bg-blue-200"
                          >
                            <BsFillEmojiHeartEyesFill size={"1.2rem"} />
                          </button>
                        </div>
                        <button
                          onClick={contents ? handleEditPost : handleNewPost}
                          className="m-2 rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
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
