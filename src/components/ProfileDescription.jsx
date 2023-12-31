/* eslint-disable react/prop-types */
import { BiLogOut } from "react-icons/bi";
import AvatarEle from "./AvatarEle";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "../context/AuthContext";
import { logoutHandler } from "../services/authServices";
import { useState } from "react";
import {
  followUser,
  getUserDetails,
  unfollowUser,
} from "../services/userServices";
import { useData } from "../context/DataContext";
import * as Separator from "@radix-ui/react-separator";
import { ACTIONS, errProceedings } from "../utils/constants";
import HoverData from "./HoverData";

export default function ProfileDescription({ user, isFollowing }) {
  const {
    setToken,
    token,
    setUser,
    setHasLoggedOut,
    user: loggedUser,
  } = useAuth();
  const { dataDispatch } = useData();
  const [loader, setLoader] = useState(false);

  const handleLogout = () => {
    setHasLoggedOut(true);
    logoutHandler(setToken, setUser);
  };

  const handleFollow = async () => {
    try {
      setLoader(true);
      let res;
      if (isFollowing) {
        res = await unfollowUser(user._id, token);
      } else {
        res = await followUser(user._id, token);
      }

      if (res.status === 200) {
        const resUser = await getUserDetails(token, loggedUser._id);
        setUser(resUser);
      }

      const profileUser = await getUserDetails(token, user._id);
      dataDispatch({
        type: ACTIONS.USER_FOLLOW_UNFOLLOW,
        payload: profileUser,
      });
    } catch (err) {
      errProceedings(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="mb-4 w-[100%] rounded border border-gray-200 bg-gray-50 px-4 py-4 shadow dark:border-gray-600 dark:bg-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex">
          <AvatarEle
            imgLink={user?.pic}
            firstName={user?.firstName}
            lastName={user?.lastName}
            isProfile
          />

          <p className="item ml-2 flex flex-col justify-center gap-1 dark:text-gray-50 md:ml-0">
            {`${user?.firstName} ${user?.lastName}`}
            <span className="text-[small]">{`@${user?.username}`}</span>
          </p>
        </div>

        {user?._id === loggedUser._id && (
          <div className="flex md:hidden">
            <EditProfileModal />
            <button
              className="mx-2 rounded-md bg-blue-600 p-2 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
              onClick={handleLogout}
            >
              <BiLogOut />
            </button>
          </div>
        )}

        {user?._id === loggedUser._id && (
          <div className="hidden md:flex">
            <EditProfileModal />
            <button
              className="mx-2 rounded-xl bg-blue-600 p-2 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        {user?._id !== loggedUser._id && (
          <button
            className="mx-2 rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:opacity-80"
            onClick={handleFollow}
            disabled={loader}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      <p className="mt-4 dark:text-gray-50 ">{user?.bio}</p>
      <div className="mt-2 hover:underline dark:text-gray-50 ">
        <a
          href="https://jagrut-sharma.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          {user?.link}
        </a>
      </div>

      <Separator.Root className="my-[1rem] self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[100%] data-[orientation=vertical]:w-px dark:bg-gray-600 md:order-1 md:block" />

      <div className="flex justify-evenly font-Poppins dark:text-gray-50">
        <HoverData list={user.followers} followers />

        <HoverData list={user.following} />
      </div>
    </div>
  );
}
