"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion
import styles from "../weather.module.sass";
import { IWeather } from "@/interface";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { ErrorAlert } from "@/components/alert";

const ThisDay = ({ respond }: { respond: IWeather }) => {
  const [timezone, setTimezone] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (respond.coord) {
      const lat = respond.coord.lat;
      const lon = respond.coord.lon;

      const fetchTimezone = async () => {
        try {
          const response = await fetch(`/api/timezone?lat=${lat}&lon=${lon}`, {
            cache: "force-cache",
          });
          const data = await response.json();

          if (data.timezone) {
            setTimezone(data.timezone);
            const timeInCity = moment.tz(data.timezone).format("HH:mm");
            setCurrentTime(timeInCity);
            setIsLoading(false);
          } else {
            setError("Unable to fetch timezone");
            setIsLoading(false);
          }
        } catch (err) {
          setError("An error occurred while fetching timezone");
          setIsLoading(false);
        }
      };

      fetchTimezone();
    }

    const interval = setInterval(() => {
      if (timezone) {
        const updatedTime = moment.tz(timezone).format("HH:mm");
        setCurrentTime(updatedTime);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [respond, timezone]);

  return (
    <div className={styles.container}>
      {error && <ErrorAlert message={error} />}
      <div className={styles.todayInfo}>
        <div className={styles.temperature}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {Math.round(respond.current.temperature)}°
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Сегодня
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={"/icons/sun.svg"}
            alt="sun icon"
            width={120}
            height={120}
          />
        </motion.div>
      </div>
      <div className={styles.placeDate}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Время: {isLoading ? "Загрузка..." : currentTime}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Город: {respond.city}
        </motion.p>
      </div>
    </div>
  );
};

export default ThisDay;