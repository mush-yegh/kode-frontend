import Workers from "../Workers";
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
  return (
    <div id={styles.departments}>
      <Tab
        className={styles.departments_tabs}
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </div>
  );
}

export default Departments;
