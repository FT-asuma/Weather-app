"use client";
import { getWeather } from "@/hooks/getWeather";
import styles from "@/app/page.module.sass";
import { IContext, IWeather } from "@/interface";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "@/components";
import { ErrorAlert } from "@/components/alert";

const defaultState: IContext = {
  setTheme: () => {},
  theme: "light",
  city: "Tashkent",
  setCity: () => {},
  respond: {
    city: "",
    country: "",
    coord: {
      lon: 0,
      lat: 0,
    },
    current: {
      temperature: 0,
      feelsLike: 0,
      pressure: 0,
      windSpeed: {
        speed: 0,
        deg: 0,
      },
      precipitation: 0,
      weather: "ХХХ",
    },
    daily: [],
  },
  isLoading: true,
  setError: () => {},
  error: "",
};

const AppContext = createContext(defaultState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [city, setCity] = useState<string>("Tashkent");
  const [error, setError] = useState<string>("");
  const [respond, setRespond] = useState<IWeather>();
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const data = await getWeather(city, setError, respond);
          setRespond(data!);
        } catch (err:any) {
          setError("Невозможно получить данные о погоде"+err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [city]);
  if (!respond || isLoading === true)
    return (
      <main className={styles.loading}>
        <Loading />
      </main>
    );
  return (
    <AppContext.Provider
      value={{
        setTheme,
        theme,
        city,
        setCity,
        respond,
        isLoading,
        setError,
        error,
      }}
    >
      <main className={theme === "light" ? styles.light : `${styles.dark}`}>
        {error && <ErrorAlert message={error} />}
        {children}
      </main>
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
