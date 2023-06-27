import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { BsFillBookmarkStarFill, BsFillHeartFill } from "react-icons/bs";
import * as Separator from "@radix-ui/react-separator";
import { useState } from "react";

import AvatarEle from "./AvatarEle.jsx";
import Modal from "./Modal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const getClassName = ({ isActive }) => {
    return isActive
      ? "flex w-[3rem] items-center justify-center rounded-md px-2 py-1 text-base font-bold hover:bg-blue-200 dark:hover:bg-slate-500 md:order-1 md:w-max bg-blue-200 dark:bg-slate-600"
      : "flex w-[3rem] items-center justify-center rounded-md px-2 py-1 text-base font-bold hover:bg-blue-200 dark:hover:bg-slate-500 md:order-1 md:w-max";
  };

  const getLikedClass = ({ isActive }) => {
    return isActive
      ? "flex w-[3rem] items-center justify-center order-1 rounded-md px-2 py-1 text-base font-bold hover:bg-blue-200 dark:hover:bg-slate-500 md:w-max bg-blue-200 dark:bg-slate-600"
      : "flex w-[3rem] items-center justify-center order-1 rounded-md px-2 py-1 text-base font-bold hover:bg-blue-200 dark:hover:bg-slate-500 md:w-max";
  };

  const getUserClass = ({ isActive }) => {
    return isActive
      ? "order-2 flex w-max items-center border-gray-300 px-2 py-2 text-base font-bold hover:bg-blue-200 dark:border-gray-600 dark:hover:bg-slate-500 md:mb-4 md:mt-auto md:rounded-md md:border bg-blue-200 dark:bg-slate-600 self-center"
      : "order-2 flex w-max items-center border-gray-300 px-2 py-2 text-base font-bold hover:bg-blue-300 dark:border-gray-600 dark:hover:bg-slate-500 md:mb-4 md:mt-auto md:rounded-md md:border self-center";
  };

  return (
    <div className="z-20 row-start-2 flex flex-col justify-between border-gray-300 dark:border-gray-600 dark:text-gray-100 md:z-[5] md:row-auto md:ml-2 md:mr-0 md:flex-col md:justify-start md:border-r">
      <aside className="fixed bottom-0 left-0 right-0 flex justify-between border-gray-300 bg-gray-200 px-4 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 md:fixed md:bottom-0 md:left-0 md:top-[69px] md:row-auto md:ml-2 md:mr-0 md:mt-2 md:w-[12.5rem] md:flex-col md:justify-start md:border-r md:px-0">
        <NavLink to={"/"} className={getClassName}>
          <AiFillHome
            size={"1.1rem"}
            className="text-blue-700 dark:text-blue-500 md:mr-2"
          />{" "}
          <span className="hidden md:block">Home</span>
        </NavLink>

        <Separator.Root className="my-[0.3rem] hidden self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] data-[orientation=vertical]:w-px dark:bg-gray-600 md:order-1 md:block" />

        <NavLink to={"/explore"} className={getClassName}>
          <FaCompass
            size={"1.1rem"}
            className="text-blue-700 dark:text-blue-500 md:mr-2"
          />{" "}
          <span className="hidden md:block">Explore</span>
        </NavLink>

        <Separator.Root className="my-[0.3rem] hidden self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] data-[orientation=vertical]:w-px dark:bg-gray-600 md:order-1 md:block" />

        <NavLink to={"/bookmarks"} className={getClassName}>
          <BsFillBookmarkStarFill
            size={"1.1rem"}
            className="text-blue-700 dark:text-blue-500 md:mr-2"
          />{" "}
          <span className="hidden md:block">Bookmarks</span>
        </NavLink>

        <Separator.Root className="my-[0.3rem] hidden self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] data-[orientation=vertical]:w-px dark:bg-gray-600 md:order-1 md:block" />

        <NavLink to={"/liked"} className={getLikedClass}>
          <BsFillHeartFill
            size={"1.1rem"}
            className="text-blue-700 dark:text-blue-500 md:mr-2"
          />{" "}
          <span className="hidden md:block">Liked Posts</span>
        </NavLink>

        <Separator.Root className="my-[0.3rem] hidden self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] data-[orientation=vertical]:w-px dark:bg-gray-600 md:order-1 md:block" />

        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

        <NavLink to={`/profile/${user._id}`} className={getUserClass}>
          <div className="flex text-[1rem] leading-[18px] text-black dark:border-t-gray-600 dark:text-slate-50">
            <AvatarEle
              imgLink={user?.pic}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />

            <div className="item hidden flex-col justify-center gap-1 font-normal md:flex">
              {`${user?.firstName} ${user?.lastName}`}
              <span className="text-[small]">{`@${user?.username}`}</span>
            </div>
          </div>
        </NavLink>
      </aside>
    </div>
  );
}
