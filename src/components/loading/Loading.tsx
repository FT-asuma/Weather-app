import Image from "next/image";
import styles from "./loader.module.sass";
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Image priority src={"/logo.png"} alt="logo image loader" width={65} height={65} />
    </div>
  );
};

export default Loading;
