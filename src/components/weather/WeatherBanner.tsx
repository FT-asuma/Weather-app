"use client";

import { useEffect, useState } from "react";

import styles from "./weather.module.sass";

import { motion } from "framer-motion";

import { IWeather } from "@/interface";
import { getWeather } from "@/hooks/getWeather";

import { Loading } from "../loading";
import { Details, ThisDay } from "./utils";
import { ErrorAlert } from "../alert";
import { useAppContext } from "@/context/AppProvider";

const WeatherBanner = () => {
  const [respond, setRespond] = useState<IWeather>();
  const [error, setError] = useState<string>();
  const { city } = useAppContext();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const data = await getWeather(city, setError, respond);
          setRespond(data!);
          setKey((prevKey) => prevKey + 1);
        } catch (err) {
          setError("Unable to fetch weather data");
        }
      };

      fetchWeather();
    }
  }, [city]);

  return (
    <motion.div
      className={styles.weatherBanner}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.8, 0.25, 1],
      }}
    >
      {error && <ErrorAlert message={error} />}
      <motion.div
        className={styles.thisDay}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          delay: 0.2,
        }}
      >
        {respond ? <ThisDay respond={respond} key={key} /> : <Loading />}
      </motion.div>

      <motion.div
        className={styles.comprehensiveDetails}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          delay: 0.4,
        }}
      >
        {respond ? <Details respond={respond} key={key} /> : <Loading />}
      </motion.div>
    </motion.div>
  );
};

export default WeatherBanner;
