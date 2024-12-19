"use client";
import { motion } from "framer-motion";

import styles from "./select.module.sass";

import { useAppContext } from "@/context/AppProvider";

import { Card } from "./card";

const SelectArray = () => {
  const { respond } = useAppContext();
  return (
    <div className={styles.selectArray}>
      {!respond
        ? [1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              className={styles.card}
              key={Math.random() * i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card day={"loading"} index={i} />
            </motion.div>
          ))
        : respond.daily.map((day, i) => (
            <motion.div
              className={styles.card}
              key={day.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card day={day} index={i} />
            </motion.div>
          ))}
    </div>
  );
};

export default SelectArray;
