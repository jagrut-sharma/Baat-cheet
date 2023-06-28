import Post from "../components/Post";
import { useData } from "../context/DataContext";

export default function Liked() {
  const {
    dataState: { likedPosts },
  } = useData();

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        {likedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
