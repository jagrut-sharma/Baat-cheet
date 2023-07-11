/* eslint-disable react/prop-types */
import { getHumanizeTimeForOlderPost } from "../utils/helperFunctions";
import DropdownComment from "./DropdownComment";
import AvatarEle from "./AvatarEle";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import NewComment from "./NewComment";

export default function Comment({
  comment,
  postLoader,
  isEditing,
  setIsEditing,
  setPostLoader,
}) {
  const { user } = useAuth();

  return (
    <>
      {isEditing[comment._id] ? (
        <NewComment content={comment} setIsEditing={setIsEditing} />
      ) : (
        <div
          className={`mb-2 w-[100%] rounded-md border border-gray-200 bg-white pb-2 shadow-md dark:border-gray-600 dark:bg-gray-700 ${
            postLoader ? "cursor-not-allowed" : ""
          }`}
        >
          <div className="mt-1 flex justify-start gap-2 px-4 pt-2.5 text-[1rem] leading-[18px] text-black dark:border-t-gray-600 dark:text-slate-50 md:gap-4">
            <Link
              to={`/profile/${comment.user._id}`}
              className={`flex ${
                postLoader ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <AvatarEle
                imgLink={comment.user.pic}
                firstName={comment.user.firstName}
                lastName={comment.user.lastName}
              />

              <div className="item ml-2 flex flex-col justify-center gap-1 md:ml-0">
                {`${
                  comment.user.firstName[0].toUpperCase() +
                  comment.user.firstName.slice(1)
                } ${
                  comment.user.lastName[0].toUpperCase() +
                  comment.user.lastName.slice(1)
                }`}
                <span className="text-[small]">{`@${comment.user.username}`}</span>
              </div>
            </Link>

            <div className="mt-[2.5px] hidden md:block">
              <span className="text-[small] text-gray-400">
                {getHumanizeTimeForOlderPost(new Date(), comment.createdAt)}
              </span>
            </div>

            {user._id === comment.user._id && (
              <DropdownComment
                comment={comment}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                setPostLoader={setPostLoader}
              />
            )}
          </div>

          <span className="visible self-center px-4 text-[small] text-gray-400 md:hidden">
            {getHumanizeTimeForOlderPost(new Date(), comment.createdAt)}
          </span>

          <p className="mt-2 px-4 pb-2 text-base dark:text-slate-50">
            {comment.comment}
          </p>
        </div>
      )}
    </>
  );
}
