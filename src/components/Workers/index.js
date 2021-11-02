import Worker from "../Worker";
import styles from "./index.module.scss";

import { mockData } from "./mockData";

const Workers = ({ department }) => {
  return (
    <div id={styles.workers}>
      {mockData.map((item) => {
        return (
          <div key={item.id}>
            <Worker worker={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Workers;
