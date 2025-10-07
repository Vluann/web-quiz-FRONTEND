import { combineReducers } from "redux";
import LoginReducers from "./loginReducers";
import loginAdmin from "./loginAdminReducers";
const allReducers = combineReducers({
  LoginReducers,
  loginAdmin,
});
export default allReducers;