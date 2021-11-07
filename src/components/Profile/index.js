import { Redirect } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import WorkerMainInfo from "../Worker/WorkerMainInfo";
import { formatAge, formatPhoneNumber } from "./../../util";
import { ROUTES, INTL_CODE } from "./../../constants";
import { Divider } from "semantic-ui-react";
import styles from "./index.module.scss";

const handlePhoneClick = (phoneNum) => {
  const cleanedNum = phoneNum.replace(/\D/g, "");
  window.open(`tel:${INTL_CODE}${cleanedNum}`);
};

function Profile() {
  const location = useLocation();

  const { state } = location;
  const isFromHome = state && state.from === ROUTES.home.pathname;

  if (!isFromHome) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.home.pathname,
          state: { from: "", worker: null },
        }}
      />
    );
  }

  const { worker } = state;

  return (
    <div id={styles.profile}>
      <div className={styles.profile_header}>
        <div className={styles.back_button_row}>
          <Link
            to={{
              pathname: ROUTES.home.pathname,
              state: {
                from: ROUTES.profile.pathname,
              },
            }}
          >
            <span className={styles.back_icon}></span>
          </Link>
        </div>
        <WorkerMainInfo
          worker={worker}
          class_name={ROUTES.profile.class_name}
        />
      </div>
      <div className={styles.birthday_row}>
        <div className={styles.birthdate}>
          <div className={styles.star_icon}></div>
          <div className={styles.date}>{worker.displayBirthdate}</div>
        </div>
        <div className={styles.age}>{formatAge(worker.birthday)}</div>
      </div>
      <Divider className={styles.gray_line} />
      <div className={styles.phone_row}>
        <div className={styles.phone_icon}></div>
        <div
          onClick={() => handlePhoneClick(worker.phone)}
          className={styles.phone_num}
        >
          {formatPhoneNumber(worker.phone)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
