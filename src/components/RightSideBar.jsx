import * as ScrollArea from "@radix-ui/react-scroll-area";
import AvatarEle from "./AvatarEle";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { followUser, getUserDetails } from "../services/userServices";
import Loader from "./Loader";
import { ACTIONS, errProceedings } from "../utils/constants";

export default function RightSideBar() {
  const [loader, setLoader] = useState(false);
  const {
    dataState: { allUsers },
    dataDispatch,
    dataLoader,
  } = useData();

  const {
    user: { following, _id: userID },
    token,
    setUser,
  } = useAuth();

  const followingIDArr = following.map(({ _id }) => _id);

  const suggestedUsers = allUsers.filter(
    ({ _id }) => !followingIDArr.includes(_id) && _id !== userID
  );

  const handleFollow = async (e, followUserID) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await followUser(followUserID, token);

      if (res.status === 200) {
        const resUser = await getUserDetails(token, userID);
        setUser(resUser);
      }

      const profileUser = await getUserDetails(token, userID);
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
    <div className="hidden border-l border-gray-300 dark:border-gray-600 lg:fixed lg:bottom-0 lg:right-0 lg:top-[69px] lg:block lg:w-[18rem]">
      <aside className="hidden flex-col px-4 lg:flex">
        <ScrollArea.Root className="mt-4 h-[22rem] w-full overflow-hidden rounded border border-stone-300 bg-white dark:border-gray-600 dark:bg-gray-700">
          <ScrollArea.Viewport className="h-full w-full rounded">
            <div className="relative pb-[10px]">
              <div className="sticky top-0 z-[2] w-full bg-white py-2 pl-4 font-OpenSans text-[1.2rem] font-bold leading-[18px] text-blue-700 shadow dark:bg-gray-700 dark:text-slate-50">
                Suggestions
              </div>
              {dataLoader ? (
                <Loader loadingState={dataLoader} />
              ) : (
                suggestedUsers.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    disabled={loader}
                  >
                    <div
                      className="mt-2.5 flex border-b border-b-gray-300 px-5 pt-2.5 text-[1rem] leading-[18px] text-black dark:border-b-gray-600 dark:text-slate-50"
                      key={user._id}
                    >
                      <AvatarEle
                        imgLink={user?.pic}
                        firstName={user?.firstName}
                        lastName={user?.lastName}
                      />

                      <div className="item flex flex-col justify-center gap-1">
                        <span>{user?.firstName + " " + user?.lastName}</span>
                        <span className="text-[small]">{`@${user.username}`}</span>

                        <button
                          className="mb-2 mt-1 w-[5.6rem] rounded-lg bg-blue-600 py-1 font-bold text-white hover:bg-opacity-80 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:opacity-80"
                          onClick={(e) => handleFollow(e, user._id)}
                          disabled={loader}
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="z-[4] flex touch-none select-none bg-gray-300 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-black before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] dark:bg-blue-500" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="flex touch-none select-none bg-gray-300 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-blue-200 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-black" />
        </ScrollArea.Root>
      </aside>
    </div>
  );
}
