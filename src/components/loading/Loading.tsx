import styles from "./loader.module.sass";
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loading