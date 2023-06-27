import { useEffect, useState } from "react";
import Post from "../components/Post";
import ProfileDescription from "../components/ProfileDescription";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { getSingleUserPosts } from "../services/postServices";
import { HashLoader } from "react-spinners";

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

  // console.log(user);

  return (
    <>
      <ProfileDescription user={user} />

      {profileLoader ? (
        <div className="mt-8 flex justify-center">
          <HashLoader
            color={
              localStorage.getItem("theme") === "light" ? "#1d4ed8" : "#3b82f6"
            }
            loading={profileLoader}
          />
        </div>
      ) : (
        userPosts.map((post) => <Post key={post._id} post={post} />)
      )}
    </>
  );
}
