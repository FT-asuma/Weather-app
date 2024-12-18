"use client";
import { useAppContext } from "@/context/AppProvider";

import styles from "../header.module.sass";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

const CheckPoint = () => {
  const { setTheme, theme, city, setCity } = useAppContext();
  
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : theme);
  };
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(inputValue)
    setInputValue("");
  };
  return (
    <div className={styles.checkPoint}>
      <button onClick={handleTheme} className={styles.toggleTheme}>
        <Image
          src={"/icons/drop.svg"}
          alt="toggle theme (dark/light)"
          width={24}
          height={28}
        />
      </button>
      <form className={styles.submitForm} onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder={city+"..."}
        />
        <button type="submit">Поиск</button>
      </form>
    </div>
  );
};

export default CheckPoint;
