import { Redirect, Route, Switch } from "react-router-dom";
import SearchBar from "../SearchBar";
import Departments from "../Departments";
import { Container } from "semantic-ui-react";
import styles from "./index.module.scss";

function App() {
  return (
    <div id={styles.app_wrapper}>
      <Container fluid>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <>
                <SearchBar />
                <Departments />
              </>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
