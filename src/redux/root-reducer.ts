import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import timesheetReducer from "./timesheet/timesheet.reducer"

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "timesheet"],
};

const rootReducer = combineReducers({
  user: userReducer,
  timesheet: timesheetReducer,
});

export default persistReducer(persistConfig, rootReducer);
