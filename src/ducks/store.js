import { createStore } from "redux";
import userReducer from "./Reducers/userReducer";

const reducer = combineReducers({
    userReducer: userReducer
});
const store = createStore(reducer);

export default store;