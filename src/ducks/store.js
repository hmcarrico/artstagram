import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    userReducer: userReducer
});
const store = createStore(reducer);

export default store;