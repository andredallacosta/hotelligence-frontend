import { combineReducers } from "redux";

import { app } from "./app.reducer";
import { hotel } from "./hotel.reducer";

const platform = combineReducers({
  app,
  hotel,
});

export default platform;
