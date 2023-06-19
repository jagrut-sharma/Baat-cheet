import * as Separator from "@radix-ui/react-separator";
import { BsBookmark, BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

import AvatarEle from "./AvatarEle";
import Dropdown from "./Dropdown";

export default function Post() {
  return (
    <div className="mb-4 w-[100%] rounded-md border border-gray-200 bg-white pb-2 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <div className="mt-1 flex justify-start gap-2 px-4 pt-2.5 text-[1rem] leading-[18px] text-black dark:border-t-gray-600 dark:text-slate-50 md:gap-4">
        <div className="flex">
          <AvatarEle
            imgLink={"sdfdf"}
            firstName={"jagrut"}
            lastName={"sharma"}
          />

          <div className="item ml-2 flex flex-col justify-center gap-1 md:ml-0">
            {"Jagrut" + " " + "Sharma"}
            <span className="text-[small]">{`test@123`}</span>
          </div>
        </div>
        {/* <p>
      {new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)))}
    </p> */}

        <div className="mt-[2.5px] hidden md:block">
          <span className="text-[small] text-gray-400">18 June, 2023</span>
        </div>

        <Dropdown />
      </div>

      <span className="visible self-center px-4 text-[small] text-gray-400 md:hidden">
        18 June, 2023
      </span>

      <p className="mt-2 px-4 pb-2 text-base dark:text-slate-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae est
        laudantium deserunt repellendus aspernatur eaque ab, soluta, quisquam
        nostrum, blanditiis dolorum ipsam vero doloribus doloremque?
      </p>

      <div className="mb-4 flex justify-center">
        <img
          src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1647014336/ecommerce/chocolatecake4.webp"
          alt="post image"
          className="w-full object-cover px-4"
        />
      </div>

      <Separator.Root className="self-start bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[100%] data-[orientation=vertical]:w-px dark:bg-gray-500" />

      <div className="flex gap-6 px-4 pt-2 dark:text-slate-50">
        <span className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
          <BsHeart size={"1.2rem"} className="cursor-pointer" />
        </span>
        <span className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
          <BsBookmark size={"1.2rem"} className="cursor-pointer" />
        </span>
        <span className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-600">
          <FaRegComment size={"1.2rem"} className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
