import { useEffect, useState } from "react";
import Post from "../components/Post";
import ProfileDescription from "../components/ProfileDescription";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getSingleUserPosts } from "../services/postServices";
import Loader from "../components/Loader";

export default function Profile() {
  const [profileLoader, setProfileLoader] = useState(false);
  const {
    dataState: { userPosts },
    dataDispatch,
  } = useData();
  const { user, token } = useAuth();

  useEffect(() => {
    getSingleUserPosts(token, user._id, dataDispatch, setProfileLoader, true);
  }, []);

  return (
    <>
      <ProfileDescription user={user} />

      {profileLoader ? (
        <Loader loadingState={profileLoader} />
      ) : (
        userPosts.map((post) => <Post key={post._id} post={post} />)
      )}
    </>
  );
}
