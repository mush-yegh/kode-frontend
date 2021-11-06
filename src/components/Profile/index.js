import { Redirect } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import WorkerMainInfo from "../Worker/WorkerMainInfo";
import { formatAge, formatPhoneNumber } from "./../../util";
import { ROUTES } from "./../../constants";
import { Divider } from "semantic-ui-react";
import styles from "./index.module.scss";

const handlePhoneClick = (phoneNum) =>
  window.open(`tel:${formatPhoneNumber(phoneNum).replace(/\D/g, "")}`);

function Profile() {
  const location = useLocation();

  const isFromHome =
    location.state && location.state.from === ROUTES.home.pathname;

  return (
    <>
      {!isFromHome && (
        <Redirect
          to={{
            pathname: ROUTES.home.pathname,
            state: { from: "", worker: null },
          }}
        />
      )}

      {isFromHome && (
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
              worker={location.state.worker}
              class_name={ROUTES.profile.class_name}
            />
          </div>
          <div className={styles.birthday_row}>
            <div className={styles.birthdate}>
              <div className={styles.star_icon}></div>
              <div className={styles.date}>
                {location.state.worker.displayBirthdate}
              </div>
            </div>
            <div className={styles.age}>
              {formatAge(location.state.worker.birthday)}
            </div>
          </div>
          <Divider className={styles.gray_line} />
          <div className={styles.phone_row}>
            <div className={styles.phone_icon}></div>
            <div
              onClick={() => handlePhoneClick(location.state.worker.phone)}
              className={styles.phone_num}
            >
              {formatPhoneNumber(location.state.worker.phone)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
