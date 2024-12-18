"use client";
import { IContext } from "@/interface";
import React, { createContext, useContext, useState } from "react";

const defaultState: IContext = {
  setTheme: () => {},
  theme: "light",
  city: "Tashkent",
  setCity: () => {},
};

const AppContext = createContext(defaultState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [city, setCity] = useState<string>("Tashkent");
  return (
    <AppContext.Provider
      value={{ setTheme, theme, city, setCity }}
      children={children}
    />
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
