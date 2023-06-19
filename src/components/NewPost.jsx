import AvatarEle from "./AvatarEle";
import { BsFillEmojiHeartEyesFill, BsFillImageFill } from "react-icons/bs";

export default function NewPost() {
  return (
    <form className="mb-4 rounded-md border border-gray-300 bg-gray-50 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <div className="flex border-b border-b-gray-300 dark:border-b-gray-500">
        <div className="m-2">
          <AvatarEle imgLink="" firstName={"jagrut"} lastName={"sharma"} />
        </div>

        <textarea
          name="post"
          placeholder="What's up?"
          id="post"
          cols="30"
          rows="8"
          className="w-full resize-none bg-gray-50 p-4 font-OpenSans outline-none dark:bg-gray-700 dark:text-slate-50"
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
          onClick={(e) => e.preventDefault()}
          className="m-2 rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
        >
          Post
        </button>
      </div>
    </form>
  );
}
