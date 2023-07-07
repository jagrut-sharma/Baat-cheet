import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SinglePostCard from "../components/SinglePostCard";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getSinglePostDetails } from "../services/postServices";
import { ACTIONS, errProceedings } from "../utils/constants";

export default function SinglePostPage() {
  const [postLoader, setPostLoader] = useState(true);
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
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <>
          {postLoader ? (
            <Loader loadingState={postLoader} />
          ) : (
            <SinglePostCard post={singlePostDetail} />
          )}
        </>
      </div>
    </main>
  );
}
