import cs from "classnames";
import { ROUTES } from "./../../../constants";
import { Image } from "semantic-ui-react";
import styles from "./index.module.scss";

const WorkerMainInfo = ({ worker, class_name = ROUTES.home.class_name }) => {
  const { avatarUrl, fullName, userTag, position } = worker;

  return (
    <div id={styles.worker_info}>
      <div className={cs(styles.main_info, styles[class_name])}>
        <Image src={avatarUrl} circular />
        <div className={styles.name_and_position}>
          <div className={styles.name_nick}>
            <div className={styles.full_name}>{fullName}</div>
            <div className={styles.nick}>{userTag}</div>
          </div>
          <div className={styles.position}>{position}</div>
        </div>
      </div>
    </div>
  );
};

export default WorkerMainInfo;
