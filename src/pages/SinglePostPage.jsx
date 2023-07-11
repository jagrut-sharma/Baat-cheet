import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SinglePostCard from "../components/SinglePostCard";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getSinglePostDetails } from "../services/postServices";
import { ACTIONS, errProceedings } from "../utils/constants";
import NewComment from "../components/NewComment";
import Comment from "../components/Comment";
import { useImmer } from "use-immer";
// import Dropdown from "../components/Dropdown";

export default function SinglePostPage() {
  const [postLoader, setPostLoader] = useState(true);
  const [isEditing, setIsEditing] = useImmer({});
  const { token } = useAuth();
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
        const commentsEditData = {};
        postDetails?.comments.forEach(
          ({ _id }) => (commentsEditData[_id] = false)
        );
        setIsEditing({ ...commentsEditData });
        dataDispatch({ type: ACTIONS.FETCH_SINGLE_POST, payload: postDetails });
      } catch (err) {
        errProceedings(err);
      } finally {
        setPostLoader(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="relative mb-[3rem] flex flex-col items-center">
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

                  {singlePostDetail.comments.map((comment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      postLoader={postLoader}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      setPostLoader={setPostLoader}
                    />
                  ))}
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
