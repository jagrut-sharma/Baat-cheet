/* eslint-disable react/prop-types */
import * as Popover from "@radix-ui/react-popover";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useData } from "../context/DataContext";

const EmojiPopover = ({ handleEmojiClick }) => {
  const { theme } = useData();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="rounded-full p-2 text-orange-400 hover:bg-blue-200"
          aria-label="add emoji"
        >
          <BsFillEmojiHeartEyesFill size={"1.2rem"} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-20 w-max rounded bg-transparent shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <div>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme={theme}
              emojiStyle="google"
              emojiVersion="3.0"
              searchDisabled
              lazyLoadEmojis
              skinTonesDisabled
              suggestedEmojisMode="recent"
              previewConfig={{
                showPreview: false,
              }}
              height="15rem"
            />
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default EmojiPopover;
