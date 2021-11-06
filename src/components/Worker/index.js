import { Link } from "react-router-dom";
import WorkerMainInfo from "./WorkerMainInfo";
import { cutBirthDate } from "../../util";
import { ROUTES } from "../../constants";
import styles from "./index.module.scss";

const Worker = ({ worker }) => {
  const { id, isBirthDateVisible, displayBirthdate } = worker;

  return (
    <div key={id} id={styles.worker}>
      <Link
        to={{
          pathname: ROUTES.profile.pathname,
          state: {
            from: ROUTES.home.pathname,
            worker,
          },
        }}
      >
        <WorkerMainInfo worker={worker} />
      </Link>

      {isBirthDateVisible && (
        <div className={styles.birthdate}>{cutBirthDate(displayBirthdate)}</div>
      )}
    </div>
  );
};

export default Worker;
