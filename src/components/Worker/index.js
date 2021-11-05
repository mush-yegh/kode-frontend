import { cutBirthDate } from "../../util";
import { Image } from "semantic-ui-react";
import styles from "./index.module.scss";

const Worker = ({ worker }) => {
  const {
    id,
    avatarUrl,
    firstName,
    lastName,
    userTag,
    position,
    isBirthDateVisible,
    displayBirthdate,
  } = worker;

  return (
    <div key={id} id={styles.worker}>
      <div className={styles.main_info}>
        <Image src={avatarUrl} circular />
        <div className={styles.main_data}>
          <div className={styles.name_nick}>
            <div className={styles.full_name}>
              {firstName} {lastName}
            </div>
            <div className={styles.nick}>{userTag}</div>
          </div>

          <div className={styles.position}>{position}</div>
        </div>
      </div>

      {isBirthDateVisible && (
        <div className={styles.birthdate}>{cutBirthDate(displayBirthdate)}</div>
      )}
    </div>
  );
};

export default Worker;
