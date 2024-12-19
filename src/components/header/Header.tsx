import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.sass";

import { CheckPoint } from "./utils";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={"/"} className={styles.title}>
        <Image priority src={"/logo.png"} alt="logo" width={65} height={65} />
        Vue Weather
      </Link>
      <CheckPoint />
    </div>
  );
};

export default Header;
