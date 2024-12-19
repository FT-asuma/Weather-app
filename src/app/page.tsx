import styles from "./page.module.sass";
import { Container, Header, SelectArray, WeatherBanner } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <Header />
        <WeatherBanner />
        <SelectArray />
      </Container>
    </main>
  );
}
