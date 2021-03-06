import { Link } from "react-router-dom";
import WorkerMainInfo from "./WorkerMainInfo";
import { ROUTES } from "../../constants";
import { cutBirthDate } from "../../helpers/formatter";
import styles from "./index.module.scss";

const Worker = ({ worker, isBirthDayVisible }) => {
  const { id, displayBirthdate, ...rest } = worker;

  const toProfile = {
    pathname: ROUTES.PROFILE.pathname,
    state: {
      from: ROUTES.HOME.pathname,
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
