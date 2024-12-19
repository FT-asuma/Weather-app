"use client";

import Image from "next/image";

import styles from "../weather.module.sass";

import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppProvider";

const Details = () => {
  const { theme, respond } = useAppContext();
  const pressureCategory = (pressure: number) =>
    pressure < 1010
      ? "Низкое давление"
      : pressure > 1020
      ? "Высокое давление"
      : "Нормальное давление";

  const precipitationStatus = (precipitation: number) =>
    precipitation === 0
      ? "Без осадков"
      : precipitation <= 0.2
      ? "Маленькая вероятность осадков"
      : precipitation <= 0.5
      ? "Средняя вероятность осадков"
      : precipitation <= 0.8
      ? "Высокая вероятность осадков"
      : "Очень высокая вероятность осадков";

  const windDirection = (deg: number) =>
    [
      "Север",
      "Северо-восток",
      "Восток",
      "Юго-восток",
      "Юг",
      "Юго-запад",
      "Запад",
      "Северо-запад",
    ][Math.floor((deg + 22.5) / 45) % 8];

  const windSpeedLevel = (speed: number) =>
    speed <= 3
      ? "Легкий ветер"
      : speed <= 7
      ? "Средний ветер"
      : speed <= 12
      ? "Сильный ветер"
      : speed <= 17
      ? "Очень сильный ветер"
      : "Ураган";

  const renderDetail = (icon: string, title: string, value: string) => (
    <motion.li
      key={title}
      className={styles.detailItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button style={theme === "dark" ? { background: "#1a1a1a" } : undefined}>
        <Image
          src={icon}
          alt={`${title} icon`}
          width={20}
          height={20}
          priority
        />
      </button>
      <div className={styles.textContainer}>
        <span>{title}</span>
        <p>{value}</p>
      </div>
    </motion.li>
  );

  return (
    <div className={styles.container}>
      <ul className={styles.details}>
        {renderDetail(
          "/icons/temp.svg",
          "Температура",
          `${Math.round(
            respond.current.temperature
          )}° - ощущается как ${Math.round(respond.current.feelsLike)}°`
        )}
        {renderDetail(
          "/icons/pressure.svg",
          "Давление",
          `${respond.current.pressure} мм ртутного столба - ${pressureCategory(
            respond.current.pressure
          )}`
        )}
        {renderDetail(
          "/icons/precipitation.svg",
          "Осадки",
          precipitationStatus(respond.current.precipitation)
        )}
        {renderDetail(
          "/icons/wind.svg",
          "Ветер",
          `${respond.current.windSpeed.speed} м/с ${windDirection(
            respond.current.windSpeed.deg
          )} - ${windSpeedLevel(respond.current.windSpeed.speed)}`
        )}
      </ul>
    </div>
  );
};

export default Details;
