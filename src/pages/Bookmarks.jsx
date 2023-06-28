import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getUserDetails } from "../services/userServices";
import Loader from "../components/Loader";
import { ACTIONS } from "../utils/constants";

export default function Bookmarks() {
  const [bookmarkLoader, setBookmarkLoader] = useState(true);
  const {
    dataState: { bookmarkedPosts },
    dataDispatch,
  } = useData();
  const { user, token } = useAuth();

  useEffect(() => {
    async function fetchuserData() {
      const fetchedUser = await getUserDetails(
        token,
        user._id,
        dataDispatch,
        setBookmarkLoader
      );
      dataDispatch({
        type: ACTIONS.FETCH_BOOKMARK_POSTS,
        payload: fetchedUser.bookmarks,
      });
    }
    fetchuserData();
  }, []);

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <>
          {bookmarkLoader ? (
            <Loader loadingState={bookmarkLoader} />
          ) : (
            <>
              {bookmarkedPosts.map((post) => (
                <Post key={post._id} post={post} fromBookmark />
              ))}
            </>
          )}
        </>
      </div>
    </main>
  );
}
