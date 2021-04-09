import { combineReducers } from "redux";
import crypto from "./crypto-reducer";

const rootReducer = combineReducers({ crypto });

export default rootReducer;
