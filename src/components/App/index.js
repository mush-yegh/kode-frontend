import SearchBar from "../SearchBar";
import Departments from "../Departments";
import { Container } from "semantic-ui-react";
import styles from "./index.module.scss";

function App() {
  return (
    <div id={styles.app_wrapper}>
      <Container fluid>
        <SearchBar />
        <Departments />
      </Container>
    </div>
  );
}

export default App;
