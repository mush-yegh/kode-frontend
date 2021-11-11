import { useState, useMemo, useEffect } from "react";
import cs from "classnames";
import _ from "lodash";
import SortModal from "./SortModal";
import { Icon, Input } from "semantic-ui-react";
import styles from "./index.module.scss";

function SearchBar({
  checkedSortStrategy,
  handleSortChange,
  handleSearchCange,
  searchKey,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState(searchKey);

  const debouncedHandleSearchChange = useMemo(() => {
    return _.debounce(handleSearchCange, 300);
  }, [handleSearchCange]);

  useEffect(() => {
    if (searchText !== searchKey) {
      debouncedHandleSearchChange(searchText);
    }
  }, [searchText, searchKey, debouncedHandleSearchChange]);

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
        value={searchText}
        onChange={(e, data) => setSearchText(data.value)}
        placeholder="Введи имя, тег, почту..."
      >
        <input />
        <Icon className={cs(styles.searchIcon, styles.icon)} />
        <SortModal
          checkedSortStrategy={checkedSortStrategy}
          handleSortChange={handleSortChange}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Input>
    </div>
  );
}

export default SearchBar;
