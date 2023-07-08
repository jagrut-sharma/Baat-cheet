import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SinglePostCard from "../components/SinglePostCard";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getSinglePostDetails } from "../services/postServices";
import { ACTIONS, errProceedings } from "../utils/constants";
import NewComment from "../components/newComment";
import { getHumanizeTimeForOlderPost } from "../utils/helperFunctions";
import AvatarEle from "../components/AvatarEle";
import Dropdown from "../components/Dropdown";

export default function SinglePostPage() {
  const [postLoader, setPostLoader] = useState(true);
  const { token, user } = useAuth();
  const {
    dataState: { singlePostDetail },
    dataDispatch,
  } = useData();
  const { postID } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setPostLoader(true);
        const postDetails = await getSinglePostDetails(token, postID);
        dataDispatch({ type: ACTIONS.FETCH_SINGLE_POST, payload: postDetails });
      } catch (err) {
        errProceedings(err);
      } finally {
        setPostLoader(false);
      }
    }

    fetchData();
  }, []);

  console.log(singlePostDetail);

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <>
          {postLoader ? (
            <Loader loadingState={postLoader} />
          ) : singlePostDetail === null ? (
            <h2 className="mt-[3rem] text-center font-Poppins text-3xl">
              Post has been deleted
            </h2>
          ) : (
            <>
              <SinglePostCard post={singlePostDetail} />
              <>
                <div className="mt-8">
                  <h3 className="font-bold text-blue-700 dark:text-slate-50">
                    {singlePostDetail.comments.length === 0
                      ? "No comments yet"
                      : `${singlePostDetail.comments.length} replies`}
                  </h3>
                  <NewComment />

                  {singlePostDetail.comments.map((comment) => {
                    return (
                      <div
                        key={comment._id}
                        className={`mb-4 w-[100%] rounded-md border border-gray-200 bg-white pb-2 shadow-md dark:border-gray-600 dark:bg-gray-700 ${
                          postLoader ? "cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="mt-1 flex justify-start gap-2 px-4 pt-2.5 text-[1rem] leading-[18px] text-black dark:border-t-gray-600 dark:text-slate-50 md:gap-4">
                          <Link
                            to={`/profile/${comment.user._id}`}
                            className={`flex ${
                              postLoader
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
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
                              {getHumanizeTimeForOlderPost(
                                new Date(),
                                comment.createdAt
                              )}
                            </span>
                          </div>

                          {/* {user._id === comment.user._id && (
                            <Dropdown post={comment} />
                          )} */}
                        </div>

                        <span className="visible self-center px-4 text-[small] text-gray-400 md:hidden">
                          {getHumanizeTimeForOlderPost(
                            new Date(),
                            comment.createdAt
                          )}
                        </span>

                        <p className="mt-2 px-4 pb-2 text-base dark:text-slate-50">
                          {comment.comment}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            </>
          )}
        </>

        {/* */}
      </div>
    </main>
  );
}
