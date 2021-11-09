import { useEffect, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setSelectedItemId } from "../../redux/ducks/profile";
import { setYear, getYear, isPast, endOfDay } from "date-fns";
import Worker from "../Worker";
import { Divider } from "semantic-ui-react";
import styles from "./index.module.scss";

const Workers = ({ workers, isBirthDateVisible }) => {
  const currentYear = getYear(Date.now());

  const firstNextYearBdayWorker = workers.find((w) => {
    if (!w.isInSelectedDep) {
      return false;
    }
    const bDayInCurrenYear = setYear(new Date(w.birthday), getYear(Date.now()));
    return isPast(endOfDay(bDayInCurrenYear));
  });

  const { id: scrollToId } = useSelector(
    (state) => state.profile,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollToId) {
      scrollToItem.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      dispatch(setSelectedItemId(null));
    }
  }, [scrollToId, dispatch]);

  const scrollToItem = useRef(null);
  const isYearLineVisible = isBirthDateVisible && firstNextYearBdayWorker;

  return (
    <div id={styles.workers}>
      {workers
        .filter((worker) => worker.isInSelectedDep)
        .map((worker) => {
          return (
            <div
              key={worker.id}
              ref={scrollToId && scrollToId === worker.id ? scrollToItem : null}
            >
              {isYearLineVisible && firstNextYearBdayWorker.id === worker.id && (
                <Divider className={styles.hr_line} horizontal>
                  {currentYear + 1}
                </Divider>
              )}
              <Worker worker={{ ...worker, isBirthDateVisible }} />
            </div>
          );
        })}
    </div>
  );
};

export default Workers;
