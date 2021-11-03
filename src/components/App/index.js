import { Redirect, Route, Switch } from "react-router-dom";
import HomeScreen from "../HomeScreen";
import Profile from "./../Profile";
import { Container } from "semantic-ui-react";
import styles from "./index.module.scss";

function App() {
  return (
    <div id={styles.app_wrapper}>
      <Container fluid>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
