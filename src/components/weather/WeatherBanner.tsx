"use client";

import styles from "./weather.module.sass";

import { motion } from "framer-motion";

import { Loading } from "../loading";
import { Details, ThisDay } from "./utils";
import { useAppContext } from "@/context/AppProvider";

const WeatherBanner = () => {
  const { respond } = useAppContext();
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
        {respond ? (
          <ThisDay key={respond.city} />
        ) : (
          <Loading />
        )}
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
        {respond ? (
          <Details key={respond.city} />
        ) : (
          <Loading />
        )}
      </motion.div>
    </motion.div>
  );
};

export default WeatherBanner;
