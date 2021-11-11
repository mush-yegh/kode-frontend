import { useEffect, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { resetSelectedItemId } from "../../redux/ducks/profile";
import { setYear, getYear, isPast, endOfDay } from "date-fns";
import Worker from "../Worker";
import { Divider } from "semantic-ui-react";
import styles from "./index.module.scss";

function isBirthdayPassed(worker) {
  const workerBirthDate = new Date(worker.birthday);
  const bDayInCurrentYear = setYear(workerBirthDate, getYear(Date.now()));
  return isPast(endOfDay(bDayInCurrentYear));
}

// Returns the first found worker whose birthday has already passed this year
// If nothing was found - returns undefined
function getFirstNextYearBdayWorker(workers) {
  return workers.find(isBirthdayPassed);
}

const Workers = ({ workers, isBirthDayVisible, isLoading }) => {
  const { id: scrollToId } = useSelector(
    (state) => state.profile,
    shallowEqual
  );

  const scrollToItem = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollToId && scrollToItem.current) {
      scrollToItem.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      dispatch(resetSelectedItemId());
    }
  }, [scrollToId, dispatch]);

  const firstNextYearBdayWorker = getFirstNextYearBdayWorker(workers);

  // Year divider is visible when chosen sorting algorithm is by closest birthday
  // and there is at least one worker whose upcoming birthday is next year
  const isYearLineVisible = isBirthDayVisible && firstNextYearBdayWorker;

  return (
    <div id={styles.workers}>
      {workers.map((worker) => {
        return (
          <div
            key={worker.id}
            ref={scrollToId && scrollToId === worker.id ? scrollToItem : null}
          >
            {isYearLineVisible && firstNextYearBdayWorker.id === worker.id && (
              <Divider className={styles.hr_line} horizontal>
                {getYear(Date.now()) + 1}
              </Divider>
            )}
            <Worker worker={worker} isBirthDayVisible={isBirthDayVisible} />
          </div>
        );
      })}
    </div>
  );
};

export default Workers;
