/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { getUserDetails } from "../services/userServices";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  user: {},
  setUser: () => {},
  authLoader: null,
  setAuthLoader: () => {},
  hasLoggedOut: null,
  setHasLoggedOut: () => {},
  contentLoader: null,
});

export const AuthProvider = function ({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useImmer(null);
  const [authLoader, setAuthLoader] = useState(false);
  const [contentLoader, setContentLoader] = useState(true);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setContentLoader(true);
      const { _id: userID } = jwt_decode(token);
      const res = await getUserDetails(token, userID);
      setUser(res);
      setContentLoader(false);
    }
    if (token) {
      fetchData();
    }
  }, []);

  const authContext = {
    token,
    setToken,
    user,
    setUser,
    authLoader,
    setAuthLoader,
    hasLoggedOut,
    setHasLoggedOut,
    contentLoader,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
