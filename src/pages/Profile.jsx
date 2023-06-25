import Post from "../components/Post";
import ProfileDescription from "../components/ProfileDescription";
import { useData } from "../context/DataContext";

export default function Profile() {
  const {
    dataState: { allPosts },
  } = useData();
  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <ProfileDescription />

        {allPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
