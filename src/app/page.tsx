import styles from "./page.module.sass";
import { Container, Header, WeatherBanner } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <Header />
        <WeatherBanner/>
      </Container>
    </main>
  );
}
