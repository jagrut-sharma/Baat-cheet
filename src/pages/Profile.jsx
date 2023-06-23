import Post from "../components/Post";
import SamplePost from "../components/SamplePost";
import ProfileDescription from "../components/ProfileDescription";

export default function Profile() {
  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <ProfileDescription />

        <SamplePost />
        <Post />
        <SamplePost />
        <Post />
        <SamplePost />
        <Post />
        <SamplePost />
        <Post />
        <SamplePost />
      </div>
    </main>
  );
}
