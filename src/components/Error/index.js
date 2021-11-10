import { ERROR_SCREEN_DATA, ERROR_TYPE } from "./../../constants";
import styles from "./index.module.scss";
import { Image } from "semantic-ui-react";

const Error = ({ type = ERROR_TYPE.CRITICAL }) => {
  const { icon, message, subMessage, suggestion } = ERROR_SCREEN_DATA[type];
  return (
    <div id={styles.error}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <Image src={icon} />
        </div>
        <div className={styles.message}>{message}</div>
        <div className={styles.subMessage}>{subMessage}</div>
        {suggestion && (
          <div className={styles.suggestion}>
            <span onClick={suggestion.action}>{suggestion.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
