import { combineReducers } from "redux";
import Search from "./SearchReducer";
import User from "./UserReducer"
const rootReducer = combineReducers({
  Search,
  User
});
export default rootReducer;