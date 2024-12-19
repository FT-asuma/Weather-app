import Image from "next/image";

import styles from "../select.module.sass";

import { Loading } from "@/components/loading";

import { motion } from "framer-motion";
import { DailyWeather } from "@/interface";

const Card = ({
  day,
  index,
}: {
  day: DailyWeather | string;
  index: number;
}) => {
  if (typeof day === "string")
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );

  return (
    <motion.div
      key={day.temperature.min}
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h4>{index === 0 ? "Сегодня" : index === 1 ? "Завтра" : day.day}</h4>
      <span>{day.date.split(".")[0]}</span>
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={
          day.forecastType === "Ясно"
            ? { opacity: 1, rotate: 360 }
            : { opacity: 1 }
        }
        transition={{ duration: 1 }}
        className={styles.imageContainer}
      >
        <Image
          src={
            day.forecastType === "Дождь"
              ? "/icons/rainy.svg"
              : day.forecastType === "Ясно"
              ? "/icons/sun.svg"
              : day.forecastType === "Облачно"
              ? "/icons/cloud.svg"
              : day.forecastType === "Небольшой дождь"
              ? "/icons/small_rain.svg"
              : day.forecastType === "Снег"
              ? "/icons/snow.svg"
              : "/icons/rain-with-sun.svg"
          }
          width={40}
          height={40}
          alt="weather icon"
        />
      </motion.div>
      <p>
        {Math.round(day.temperature.max) > 0
          ? "+" + Math.round(day.temperature.max)
          : Math.round(day.temperature.max)}
        °
      </p>
      <span>
        {Math.round(day.temperature.min) > 0
          ? "+" + Math.round(day.temperature.min)
          : Math.round(day.temperature.min)}
        °
      </span>
      <span>{day.forecastType}</span>
    </motion.div>
  );
};

export default Card;
