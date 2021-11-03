import Workers from "../Workers";
import Error from "../Error";
import { DEPARTMENTS } from "../../constants";
import { Tab } from "semantic-ui-react";
import styles from "./index.module.scss";

const panes = DEPARTMENTS.map((dep) => ({
  menuItem: dep,
  render: () => (
    <Tab.Pane attached={false}>
      <Workers department={dep} />
    </Tab.Pane>
  ),
}));

function Departments() {
  const bool = true;
  return (
    <div id={styles.departments}>
      {bool && (
        <Tab
          className={styles.departments_tabs}
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      )}
      {!bool && <Error />}
    </div>
  );
}

export default Departments;
