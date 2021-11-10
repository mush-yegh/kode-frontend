import styles from "./index.module.scss";

const LoaderScreen = () => {
  return (
    <div id={styles.loader}>
      {Array(10)
        .fill("")
        .map((el, i) => (
          <div key={`loader_${i}`} className={styles.row}>
            <div className={styles.avatar}></div>
            <div className={styles.two_lines}>
              <div className={styles.first_line}></div>
              <div className={styles.second_line}></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoaderScreen;
