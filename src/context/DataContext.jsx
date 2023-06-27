/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { dataReducer, initialData } from "../reducer/DataReducer";
import { useAuth } from "./AuthContext";
import { getAllUsers } from "../services/userServices";
import { getAllPosts } from "../services/postServices";

const DataContext = createContext({
  dataState: {},
  dataDispatch: () => {},
  dataLoader: null,
  setDataLoader: () => {},
});

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useImmerReducer(dataReducer, initialData);
  const [dataLoader, setDataLoader] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      getAllUsers(token, dataDispatch);
      getAllPosts(token, dataDispatch, user);
    }
  }, [token]);

  const dataContext = {
    dataState,
    dataDispatch,
    dataLoader,
    setDataLoader,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);
