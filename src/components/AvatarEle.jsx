/* eslint-disable react/prop-types */
import * as Avatar from "@radix-ui/react-avatar";

// eslint-disable-next-line react/prop-types
export default function AvatarEle({ imgLink, firstName, lastName, isProfile }) {
  return (
    <Avatar.Root
      className={`inline-flex h-[2.5rem] w-[2.5rem] select-none items-center justify-center overflow-hidden rounded-full align-middle md:mr-2  ${
        isProfile ? "md:h-[55px] md:w-[55px]" : "md:h-[45px] md:w-[45px]"
      }`}
    >
      <Avatar.Image
        className={`border-1 ${
          isProfile ? "h-full w-full" : "h-10 w-10"
        } rounded-full border border-gray-800 object-cover`}
        src={imgLink}
        alt={`${firstName} ${lastName}`}
      />
      <Avatar.Fallback
        className="leading-1 flex h-full w-full items-center justify-center bg-orange-100 text-[15px] font-medium text-black dark:text-black"
        delayMs={500}
      >
        {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
