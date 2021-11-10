import { useState, useMemo, useEffect } from "react";
import cs from "classnames";
import _ from "lodash";
import { Button, Icon, Input, Modal, Radio } from "semantic-ui-react";
import { SORT_BY } from "../../constants";
import styles from "./index.module.scss";

function SearchBar({
  checkedSortStrategy,
  handleSortByCange,
  handleSearchCange,
  searchKey,
}) {
  const [isOpen, setIsOpen] = useState(false);
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

        <Modal
          className={styles.modal}
          size={"mini"}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          open={isOpen}
          trigger={
            <Button className={styles.filter_button}>
              <Icon
                className={cs({
                  [styles.icon]: true,
                  [styles.sortIcon]: checkedSortStrategy === SORT_BY[0].value,
                  [styles.sortIconPurple]:
                    checkedSortStrategy === SORT_BY[1].value,
                })}
              />
            </Button>
          }
        >
          <Modal.Header>
            <div>
              <span>Сортировка</span>
              <span onClick={() => setIsOpen(false)}></span>
            </div>
          </Modal.Header>
          <Modal.Content>
            {SORT_BY.map((item) => {
              const { value, name, label } = item;
              return (
                <div key={value} className={styles.radio_row}>
                  <Radio
                    label={label}
                    name={name}
                    value={value}
                    checked={checkedSortStrategy === value}
                    className={cs({
                      [styles.checked_radio]: checkedSortStrategy === value,
                    })}
                    onChange={(e, { value }) => {
                      handleSortByCange(value);
                      setIsOpen(false);
                    }}
                  />
                </div>
              );
            })}
          </Modal.Content>
        </Modal>
      </Input>
    </div>
  );
}

export default SearchBar;
