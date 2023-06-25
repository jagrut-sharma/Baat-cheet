/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useImmer } from "use-immer";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  user: {},
  setUser: () => {},
  authLoader: null,
  setAuthLoader: () => {},
  hasLoggedOut: null,
  setHasLoggedOut: () => {},
});

export const AuthProvider = function ({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useImmer(JSON.parse(localStorage.getItem("user")));
  const [authLoader, setAuthLoader] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const authContext = {
    token,
    setToken,
    user,
    setUser,
    authLoader,
    setAuthLoader,
    hasLoggedOut,
    setHasLoggedOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
