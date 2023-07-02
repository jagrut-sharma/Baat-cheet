import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getUserDetails } from "../services/userServices";
import Loader from "../components/Loader";
import { ACTIONS } from "../utils/constants";
import { getBookmarks } from "../services/postServices";

export default function Bookmarks() {
  const [bookmarkLoader, setBookmarkLoader] = useState(true);
  const {
    dataState: { bookmarkedPosts },
    dataDispatch,
  } = useData();
  const { user, token } = useAuth();

  useEffect(() => {
    async function fetchuserData() {
      setBookmarkLoader(true);
      const fetchedUser = await getUserDetails(
        token,
        user._id,
        dataDispatch,
        setBookmarkLoader
      );
      setBookmarkLoader(true);

      const resArr = await getBookmarks(token);

      dataDispatch({
        type: ACTIONS.FETCH_BOOKMARK_POSTS,
        payload: { bookmarksID: fetchedUser.bookmarks, bookmarksPost: resArr },
      });
      setBookmarkLoader(false);
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
              {bookmarkedPosts.length === 0 ? (
                <p className="mt-8 text-center font-Poppins text-2xl">
                  Bookmark to see posts here
                </p>
              ) : (
                bookmarkedPosts.map((post) => (
                  <Post key={post._id} post={post} fromBookmark />
                ))
              )}
            </>
          )}
        </>
      </div>
    </main>
  );
}
