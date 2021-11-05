import Worker from "../Worker";
import styles from "./index.module.scss";

const Workers = ({ workers }) => {
  return (
    <div id={styles.workers}>
      {workers
        .filter((worker) => worker.isInSelectedDep)
        .map((worker) => {
          return (
            <div key={worker.id}>
              <Worker worker={worker} />
            </div>
          );
        })}
    </div>
  );
};

export default Workers;
