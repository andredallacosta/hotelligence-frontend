import { combineReducers } from "redux";

import info from "./info";
import security from "./security";
import platform from "./platform";

const rootReducer = combineReducers({
  info,
  security,
  platform,
});

export default rootReducer;
