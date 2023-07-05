/* eslint-disable react/prop-types */
import * as HoverCard from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import AvatarEle from "./AvatarEle";

const HoverData = ({ list, followers }) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]">
          {followers ? (
            <p>
              <span className="mr-2">{list.length}</span>Followers
            </p>
          ) : (
            <p>
              <span className="mr-2">{list.length}</span>Following
            </p>
          )}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="max-h-[15rem] w-[15rem] overflow-y-auto rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="flex flex-col">
            {list.map((user) => (
              <Link to={`/profile/${user._id}`} key={user._id}>
                <div
                  className="flex border-b border-b-gray-300 py-2 text-[1rem] leading-[18px] text-black dark:border-b-gray-600 dark:text-slate-50"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverData;
