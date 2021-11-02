import { ERROR_SCREEN_DATA } from "./../../constants";
import styles from "./index.module.scss";
import { Image } from "semantic-ui-react";

const p = ["criticalError", "emptySearch"];

const Error = ({ page = p[0] }) => {
  const { icon, message, subMessage, suggestion } = ERROR_SCREEN_DATA[page];
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
            <span onClick={suggestion.onclick}>{suggestion.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
