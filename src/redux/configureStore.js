import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import { isDev } from "./../config";
import { rootReducer } from "./ducks";

export const configureStore = () => {
  const middleWare = [];
  const loggerMiddleware = createLogger({
    predicate: () => isDev(),
  });
  middleWare.push(thunk);
  middleWare.push(loggerMiddleware);

  const initialState = {};
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleWare)
  );

  return store;
};
