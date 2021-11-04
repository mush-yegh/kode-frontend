import { DEPARTMENTS } from "../../constants";
import { Menu } from "semantic-ui-react";
import styles from "./index.module.scss";

function DepartmentsTab({ selectedDepartment, handleDepartmentChange }) {
  return (
    <div id={styles.departmentsTab}>
      <Menu pointing secondary>
        {DEPARTMENTS.filter((dep) => dep.isTabItem).map((dep) => (
          <Menu.Item
            key={dep.name}
            name={dep.name}
            active={dep.name === selectedDepartment}
            onClick={(e, { name }) => {
              if (name === selectedDepartment) {
                return;
              }
              handleDepartmentChange(name);
            }}
          />
        ))}
      </Menu>
    </div>
  );
}

export default DepartmentsTab;
