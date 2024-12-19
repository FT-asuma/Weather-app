"use client"
import React, { useEffect, useState } from "react";
import styles from "./select.module.sass";
import { IWeather } from "@/interface";
import { useAppContext } from "@/context/AppProvider";
import { getRangeWeather } from "@/hooks/getRangeWeather";
import { Loading } from "../loading";
import { Card } from "./card";
import { getWeather } from "@/hooks/getWeather";
const SelectArray = () => {
  const [respond, setRespond] = useState<IWeather>();
  const [error, setError] = useState<string>();
  const { city } = useAppContext();
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const data = await getWeather("Tashkent", setError, respond);
          setRespond(data!)
          setKey((prevKey:number) => prevKey + 1);
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
