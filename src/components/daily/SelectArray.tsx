"use client"
import React, { useEffect, useState } from "react";
import styles from "./select.module.sass";
import { IWeather } from "@/interface";
import { useAppContext } from "@/context/AppProvider";
import { getRangeWeather } from "@/hooks/getRangeWeather";
import { Loading } from "../loading";
import { Card } from "./card";
const SelectArray = () => {
  const [respond, setRespond] = useState<any[] | any>();
  const [error, setError] = useState<string>();
  const { city } = useAppContext();
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const data = await getRangeWeather(city, 8, setError);
          setRespond(data)
          setKey((prevKey) => prevKey + 1);
        } catch (err) {
          setError("Unable to fetch weather data");
        }
      };

      fetchWeather();
    }
  }, [city]);
  return <div className={styles.selectArray}>
    {JSON.stringify(respond)}
    {/* {!respond ? <Loading/> : respond.daily.map((day, i) => (
        <div className={styles.card}>
            <Card day={day} index={i}/>
        </div>
    ))} */}
  </div>;
};

export default SelectArray;
