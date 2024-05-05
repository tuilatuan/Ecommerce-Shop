import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import scrollTop from "../utils/scrollTop";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const pathName = useLocation();

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      scrollTop();
    }, 100);
    return () => {
      clearTimeout(myTimeOut);
    };
  }, [pathName]);

  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
