import cs from "classnames";
import { Button, Icon, Input } from "semantic-ui-react";
import styles from "./index.module.scss";

function SearchBar() {
  return (
    <div id={styles.search}>
      <div className={styles.title}>Поиск</div>
      <Input
        fluid
        icon
        iconPosition="left"
        className={styles.search_input}
        type="text"
        name="search"
        onChange={(e, data) => console.log("data = " + data.value)}
        placeholder="Введи имя, тег, почту..."
      >
        <input />
        <Icon className={cs(styles.searchIcon, styles.icon)} />
        <Button
          onClick={() => console.log("Button clicked")}
          className={styles.filter_button}
        >
          <Icon className={cs(styles.filterIcon, styles.icon)} />
        </Button>
      </Input>
    </div>
  );
}

export default SearchBar;
