import Image from "next/image";
import styles from "../select.module.sass";
import { DailyWeather } from "@/interface";
const Card = ({day, index}:{day: DailyWeather, index: number}) => {
  return (
    <div className={styles.container}>
      <h4>{index === 0 ? "Сегодня": index === 1 ? "Завтра": day.date.split(",")[0]}</h4>
      <span>23/10</span>
      <Image src={"/icons/cloud.svg"} width={40} height={40} alt="cloud icon" />
      <p>max temp°</p>
      <span>+15° min</span>
      <span>detail</span>
    </div>
  );
};

export default Card;
