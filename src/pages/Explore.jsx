import { Tab } from "@headlessui/react";

import Post from "../components/Post";
import { useData } from "../context/DataContext";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Explore() {
  const {
    dataState: { allPosts },
  } = useData();

  const [currCategory, setCurrCategory] = useState("Recent");

  let postCategory = ["Recent", "Trending"];

  const handleCategory = (e) => {
    setCurrCategory(e.target.name);
  };

  let sortedPosts = [...allPosts];

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

        {sortedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
