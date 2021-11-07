import cs from "classnames";
import { DEPARTMENTS } from "../../constants";
import { Menu } from "semantic-ui-react";
import styles from "./index.module.scss";

function DepartmentsTab({ isLoading, selectedDepId, handleDepartmentChange }) {
  const handleDepartmentClick = (depName) => {
    const clickedItem = DEPARTMENTS.find((d) => d.name === depName);
    // prevent rerendering when clicking on the selected item
    if (clickedItem.id === selectedDepId) {
      return;
    }
    handleDepartmentChange(clickedItem.id);
  };

  return (
    <div id={styles.departmentsTab}>
      <Menu pointing secondary>
        {DEPARTMENTS.filter((dep) => dep.isMenuItem).map(({ id, name }) => (
          <Menu.Item
            key={id}
            name={name}
            active={id === selectedDepId}
            disabled={isLoading}
            className={cs({
              [styles.first_letter_lower]: id === DEPARTMENTS[4].id,
            })}
            onClick={(e, { name }) => handleDepartmentClick(name)}
          />
        ))}
      </Menu>
    </div>
  );
}

export default DepartmentsTab;
