import { useParams } from "react-router-dom";
import ProfileDescription from "../components/ProfileDescription";
import { useData } from "../context/DataContext";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserDetails } from "../services/userServices";
import { getSingleUserPosts } from "../services/postServices";
import Post from "../components/Post";
import Loader from "../components/Loader";

export default function GuestProfile() {
  const [profileLoader, setProfileLoader] = useState(true);
  const [postLoader, setPostLoader] = useState(false);
  const { userID } = useParams();
  const {
    dataState: { profileDetails, profilePosts },
    dataDispatch,
  } = useData();
  const { token } = useAuth();

  useEffect(() => {
    getUserDetails(token, userID, dataDispatch, setProfileLoader);
    getSingleUserPosts(token, userID, dataDispatch, setPostLoader);
  }, [userID]);

  return (
    <>
      {profileLoader ? (
        <Loader loadingState={profileLoader} />
      ) : (
        <>
          <ProfileDescription user={profileDetails} />
          {postLoader ? (
            <Loader loadingState={postLoader} />
          ) : (
            <>
              {profilePosts.length === 0 && (
                <p className="mt-8 text-center font-Poppins text-2xl dark:text-slate-50">
                  No posts found. Post something to start seeing activity
                </p>
              )}
              {profilePosts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
