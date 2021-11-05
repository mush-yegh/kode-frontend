import { MONTH_SYMBOLS_COUNT } from "./../../constants";
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
      <div className={styles.birthdate}>
        {displayBirthdate.substring(
          0,
          displayBirthdate.indexOf(" ") + MONTH_SYMBOLS_COUNT + 1
        )}
      </div>
    </div>
  );
};

export default Worker;
