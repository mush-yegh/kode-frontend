import Header from "../Header";
import { Container } from "semantic-ui-react";
import styles from "./index.module.scss";

function App() {
  return (
    <div id={styles.app_wrapper}>
      <Container fluid>
        <Header />
      </Container>
    </div>
  );
}

export default App;
