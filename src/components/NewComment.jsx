import AvatarEle from "./AvatarEle";
import { useAuth } from "../context/AuthContext";
import EmojiPopover from "./EmojiPopover";
import { useState } from "react";
import { ACTIONS, errProceedings } from "../utils/constants";
import { addComment } from "../services/commentServices";
import { useParams } from "react-router-dom";
import { getSinglePostDetails } from "../services/postServices";
import { useData } from "../context/DataContext";
import { ClipLoader } from "react-spinners";

export default function NewComment() {
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const { user, token } = useAuth();
  const { dataDispatch } = useData();
  const { postID } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await addComment(postID, token, comment);

      const postDetails = await getSinglePostDetails(token, postID);
      dataDispatch({ type: ACTIONS.FETCH_SINGLE_POST, payload: postDetails });
      setComment("");
    } catch (err) {
      errProceedings(err);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const addEmoji = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  return (
    <form
      className="my-2 rounded-md border border-gray-300 bg-gray-50 shadow-md dark:border-gray-600 dark:bg-gray-700"
      onSubmit={handleSubmit}
    >
      <div className="border-b border-b-gray-300 dark:border-b-gray-500">
        <div className="flex">
          <div className="m-2">
            <AvatarEle
              imgLink={user?.pic}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />
          </div>

          <textarea
            name="post"
            placeholder="Post a comment"
            id="post"
            cols="30"
            rows="3"
            className={`w-full resize-none bg-gray-50 p-2 font-OpenSans outline-none disabled:cursor-not-allowed dark:bg-gray-700 dark:text-slate-50`}
            value={comment}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="ml-4 flex items-center gap-4">
          <EmojiPopover handleEmojiClick={addEmoji} />
        </div>

        <button className="m-2 w-[6.8rem] rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:opacity-80">
          {loader ? (
            <ClipLoader
              color="#ffffff"
              size={18}
              cssOverride={{
                marginTop: "4px",
              }}
            />
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </form>
  );
}
