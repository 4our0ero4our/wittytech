"use client";
import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [lockedOpen, setLockedOpen] = useState(false);
  return (
    <GlobalStateContext.Provider value={{ lockedOpen, setLockedOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export default GlobalStateProvider;
