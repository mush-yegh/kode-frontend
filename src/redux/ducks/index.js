import { combineReducers } from "redux";
import workers from "./workers";
import profile from "./profile";

export const rootReducer = combineReducers({ workers, profile });
