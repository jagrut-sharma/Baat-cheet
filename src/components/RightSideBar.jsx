import * as ScrollArea from "@radix-ui/react-scroll-area";
import AvatarEle from "./AvatarEle";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function RightSideBar() {
  const {
    dataState: { allUsers },
  } = useData();

  const {
    user: { following, _id: userID },
  } = useAuth();

  const followingIDArr = following.map(({ _id }) => _id);

  const suggestedUsers = allUsers.filter(
    ({ _id }) => !followingIDArr.includes(_id) && _id !== userID
  );

  return (
    <div className="hidden border-l border-gray-300 dark:border-gray-600 lg:fixed lg:bottom-0 lg:right-0 lg:top-[69px] lg:block lg:w-[18rem]">
      <aside className="hidden flex-col px-4 lg:flex">
        <ScrollArea.Root className="mt-4 h-[22rem] w-full overflow-hidden rounded border border-stone-300 bg-white dark:border-gray-600 dark:bg-gray-700">
          <ScrollArea.Viewport className="h-full w-full rounded">
            <div className="relative pb-[10px]">
              <div className="sticky top-0 z-[2] w-full bg-white py-2 pl-4 font-OpenSans text-[1.2rem] font-bold leading-[18px] text-blue-700 shadow dark:bg-gray-700 dark:text-slate-50">
                Suggestions
              </div>
              {suggestedUsers.map((user) => (
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
                    {user?.firstName + " " + user?.lastName}
                    <span className="text-[small]">{`@${user.username}`}</span>
                    <button className="mb-2 mt-1 w-[5.6rem] rounded-lg bg-blue-600 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
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
