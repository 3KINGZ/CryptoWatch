import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = { crypto: { loading: false, cryptos: [], message: "" } };

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
