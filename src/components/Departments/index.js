import { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { fetchWorkersList } from "../../redux/ducks/workers";

import Workers from "../Workers";
import Error from "../Error";

import { DEPARTMENTS } from "../../constants";

import { Tab } from "semantic-ui-react";
import styles from "./index.module.scss";

function Departments() {
  const { workersList, isLoading, error } = useSelector(
    (state) => state.workers,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkersList());
  }, [dispatch]);

  const panes = DEPARTMENTS.map((dep) => ({
    menuItem: dep,
    render: () => (
      <Tab.Pane attached={false}>
        <Workers workers={workersList} />
      </Tab.Pane>
    ),
  }));

  return (
    <div id={styles.departments}>
      {isLoading && <div>LOADING...</div>}
      {workersList && (
        <Tab
          className={styles.departments_tabs}
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      )}
      {error && <Error />}
    </div>
  );
}

export default Departments;
