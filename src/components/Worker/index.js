import { Link } from "react-router-dom";
import WorkerMainInfo from "./WorkerMainInfo";
import { cutBirthDate } from "../../util";
import { ROUTES } from "../../constants";
import styles from "./index.module.scss";

const Worker = ({ worker, isBirthDayVisible }) => {
  const { id, displayBirthdate, ...rest } = worker;

  const toProfile = {
    pathname: ROUTES.profile.pathname,
    state: {
      from: ROUTES.home.pathname,
      worker,
    },
  };

  return (
    <div key={id} id={styles.worker}>
      <Link to={toProfile}>
        <WorkerMainInfo worker={rest} />
      </Link>
      {isBirthDayVisible && (
        <div className={styles.birthdate}>{cutBirthDate(displayBirthdate)}</div>
      )}
    </div>
  );
};

export default Worker;
