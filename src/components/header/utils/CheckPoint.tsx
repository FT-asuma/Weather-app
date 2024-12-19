"use client";
import { useAppContext } from "@/context/AppProvider";

import styles from "../header.module.sass";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

const CheckPoint = () => {
  const { setTheme, theme, setCity, setError } = useAppContext();

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setError("Ввод не может быть пустым");
    } else {
      setCity(inputValue);
    }
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
      <form
        id="form submit"
        name="submit"
        className={styles.submitForm}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={handleChange}
          placeholder="Выбрать город"
        />
        <button type="submit">Поиск</button>
      </form>
    </div>
  );
};

export default CheckPoint;
