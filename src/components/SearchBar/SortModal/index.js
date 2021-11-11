import cs from "classnames";
import { Button, Icon, Modal, Radio } from "semantic-ui-react";
import { SORT_BY } from "./../../../constants";
import styles from "./index.module.scss";

const SortModal = ({
  checkedSortStrategy,
  handleSortChange,
  isModalOpen: isOpen,
  setIsModalOpen: setIsOpen,
}) => {
  const handleChange = (value) => {
    handleSortChange(value);
    setIsOpen(false);
  };
  return (
    <Modal
      id={styles.modal}
      size={"mini"}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      trigger={
        <Button id={styles.filter_button}>
          <Icon
            className={cs({
              [styles.icon]: true,
              [styles.sortIcon]: checkedSortStrategy === SORT_BY[0].value,
              [styles.sortIconPurple]: checkedSortStrategy === SORT_BY[1].value,
            })}
          />
        </Button>
      }
    >
      <Modal.Header className={styles.header}>
        <div>
          <span>Сортировка</span>
          <span onClick={() => setIsOpen(false)}></span>
        </div>
      </Modal.Header>
      <Modal.Content className={styles.content}>
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
                onChange={(e, { value }) => handleChange(value)}
              />
            </div>
          );
        })}
      </Modal.Content>
    </Modal>
  );
};

export default SortModal;
