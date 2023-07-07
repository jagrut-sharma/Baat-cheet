import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import Loader from "../components/Loader";
import { getAllPosts, getLikedPosts } from "../services/postServices";
import { ACTIONS } from "../utils/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [currCategory, setCurrCategory] = useState("Recent");
  const [loader, setLoader] = useState(false);
  const { user, token } = useAuth();
  const { dataState, dataDispatch } = useData();
  const postCategory = ["Recent", "Trending"];

  console.log(dataState.allPosts);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoader(true);
        const allPosts = await getAllPosts(token);
        dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
        const likedPosts = getLikedPosts(allPosts, user);
        dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    }

    fetchPosts();
  }, []);

  const handleCategory = (e) => {
    setCurrCategory(e.target.name);
  };

  const followingPeoplesID = user.following.map(({ _id }) => _id);
  followingPeoplesID.push(user._id);

  const homePagePosts = dataState.allPosts.filter(({ author }) =>
    followingPeoplesID.includes(author._id)
  );

  let sortedPosts = [...homePagePosts];

  if (currCategory === "Trending") {
    sortedPosts.sort((a, b) => {
      const likeA = a.likes.likeCount;
      const likeB = b.likes.likeCount;

      return likeB - likeA;
    });
  }

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <Tab.Group className="mb-2">
          <Tab.List className="sticky top-[54px] z-10 flex space-x-1 rounded bg-blue-600 p-1 dark:bg-gray-700 sm:top-[61px] md:top-[69px]">
            {postCategory.map((category) => (
              <Tab
                as="button"
                key={category}
                onClick={handleCategory}
                name={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-md py-2.5 text-sm font-bold leading-5 text-blue-700",
                    "focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow dark:bg-gray-500 dark:text-white"
                      : "text-white hover:bg-slate-400/40 hover:text-white dark:text-blue-300"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        <NewPost user={user} token={token} dataDispatch={dataDispatch} />

        {loader ? (
          <Loader loadingState={loader} />
        ) : (
          <>
            {sortedPosts.length === 0 && (
              <p className="mt-8 text-center font-Poppins text-2xl">
                Start Following and posting to see posts
              </p>
            )}

            {sortedPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
