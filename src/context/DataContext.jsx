/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { dataReducer, initialData } from "../reducer/DataReducer";
import { useAuth } from "./AuthContext";
import { getAllUsers } from "../services/userServices";
import { getAllPosts, getLikedPosts } from "../services/postServices";
import { ACTIONS } from "../utils/constants";

const DataContext = createContext({
  dataState: {},
  dataDispatch: () => {},
  dataLoader: null,
  setDataLoader: () => {},
  theme: null,
  setTheme: () => {},
});

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useImmerReducer(dataReducer, initialData);
  const [dataLoader, setDataLoader] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const { token, user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        setDataLoader(true);
        const users = await getAllUsers(token);
        const allPosts = await getAllPosts(token);

        const likedPosts = getLikedPosts(allPosts, user);
        dataDispatch({ type: ACTIONS.ADD_LIKED_POST, payload: likedPosts });
        dataDispatch({
          type: ACTIONS.INITIALIZE_BOOKMARK_ID,
          payload: user.bookmarks,
        });
        dataDispatch({ type: ACTIONS.FETCH_ALL_POSTS, payload: allPosts });
        dataDispatch({ type: ACTIONS.FETCH_ALL_USERS, payload: users });
      } catch (err) {
        console.log(err);
        const errRes = err?.response?.data?.message ?? "";
        const errMsg = err?.response?.data?.error ?? "";
        console.log(`${err?.response?.status}:${errRes} ${errMsg}`);
      } finally {
        setDataLoader(false);
      }
    }
    if (token && user) {
      fetchData();
    }
  }, [token, user]);

  const dataContext = {
    dataState,
    dataDispatch,
    dataLoader,
    setDataLoader,
    theme,
    setTheme,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);
