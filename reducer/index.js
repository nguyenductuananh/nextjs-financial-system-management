import { combineReducers } from "redux";
import { default as authReducer } from "./auth.reducer";
const rootReducer = combineReducers({ authReducer });
export default rootReducer;
