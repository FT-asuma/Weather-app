"use client";
import { getWeather } from "@/hooks/getWeather";
import { IContext, IWeather } from "@/interface";
import React, { createContext, useContext, useState } from "react";

interface IGetWeatherFn {
  city: string,
  setError: (message: string) => void,
  previousData?: IWeather
}

const defaultState: IContext = {
  setTheme: () => {},
  theme: "light",
  city: "Tashkent",
  setCity: () => {},
  getWeatherFn: () => {},
};

const AppContext = createContext(defaultState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [city, setCity] = useState<string>("Tashkent");

  const getWeatherFn = async ({city, setError, previousData}:IGetWeatherFn) => {
    const respond = await getWeather(city, setError, previousData)
    return respond
  }

  return (
    <AppContext.Provider
      value={{ setTheme, theme, city, setCity, getWeatherFn }}
      children={children}
    />
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
