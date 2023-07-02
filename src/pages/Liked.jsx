import Post from "../components/Post";
import { useData } from "../context/DataContext";

export default function Liked() {
  const {
    dataState: { likedPosts },
  } = useData();

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        {likedPosts.length === 0 ? (
          <p className="mt-8 text-center font-Poppins text-2xl">
            Start Following and posting to see posts
          </p>
        ) : (
          likedPosts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </main>
  );
}
