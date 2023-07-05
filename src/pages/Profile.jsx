import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    navigate(`/profile/${user._id}`);
  }, []);

  return (
    <>
      <h1>Navigating to Profile..</h1>
    </>
  );
}
