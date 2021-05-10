import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducer/index";

export const makeStore = (context) => createStore(rootReducer);

export const wrapper = createWrapper(makeStore, { debug: true });
