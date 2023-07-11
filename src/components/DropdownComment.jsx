/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { deleteComment } from "../services/commentServices";
import {
  getAllPosts,
  getLikedPosts,
  getSinglePostDetails,
} from "../services/postServices";
import { useData } from "../context/DataContext";
import {
  ACTIONS,
  errProceedings,
  errorToastConfig,
  toastConfig,
} from "../utils/constants";
import { toast } from "react-toastify";

export default function DropdownComment({ comment, setIsEditing, isEditing }) {
  const { token, user } = useAuth();
  const { postID } = useParams();
  const { dataDispatch } = useData();
  //   console.log(comment);

  const handleDelete = async () => {
    try {
      await deleteComment(token, postID, comment._id);
      const postDetails = await getSinglePostDetails(token, postID);
      const commentsEditData = {};
      postDetails?.comments.forEach(
        ({ _id }) => (commentsEditData[_id] = false)
      );
      setIsEditing({ ...commentsEditData });
      dataDispatch({ type: ACTIONS.FETCH_SINGLE_POST, payload: postDetails });

      const allPosts = await getAllPosts(token);
      dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });

      const likedPosts = getLikedPosts(allPosts, user);
      dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });
      toast.info("Deleted comment", toastConfig);
    } catch (err) {
      errProceedings(err);
      toast.error("Could not delete comment", errorToastConfig);
    }
  };

  const handleEditClick = () => {
    const objectKeys = Object.keys(isEditing);
    const isEditObj = {};
    objectKeys.forEach((id) => {
      isEditObj[id] = id === comment._id ? true : false;
    });

    setIsEditing(isEditObj);
  };

  return (
    <div className="ml-auto self-center text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
              <CiMenuKebab
                className="h-5 w-5 fill-black dark:fill-slate-50"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-500 dark:bg-gray-600">
            <div className="px-1 py-1 ">
              <Menu.Item onClick={handleEditClick}>
                {({ active }) => (
                  <span
                    className={`${
                      active
                        ? "bg-blue-600 text-white dark:font-bold"
                        : "text-gray-900"
                    } da group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm dark:text-slate-50`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </span>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleDelete}
                    className={`${
                      active
                        ? "bg-blue-600 text-white dark:font-bold"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-50`}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#3b82f6"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#3b82f6"
        stroke="#f8fafc"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#3b82f6" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#3b82f6"
        stroke="#f8fafc"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#f8fafc" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#f8fafc" strokeWidth="2" />
    </svg>
  );
}
