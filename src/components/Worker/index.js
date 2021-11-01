import { Image } from "semantic-ui-react";
import styles from "./index.module.scss";

const Worker = ({ worker }) => {
  return (
    <div key={worker.id} id={styles.worker}>
      <div className={styles.main_info}>
        <Image src={worker.avatarUrl} circular />

        <div className={styles.main_data}>
          <div className={styles.name_nick}>
            <div className={styles.full_name}>
              {worker.firstName} {worker.lastName}
            </div>
            <div className={styles.nick}>{worker.userTag}</div>
          </div>

          <div className={styles.position}>{worker.position}</div>
        </div>
      </div>

      <div className={styles.birthdate}>{worker.birthday}</div>
    </div>
  );
};

export default Worker;
