import { combineReducers } from "@reduxjs/toolkit";
import sugarLevelSlice from "./slices/sugarLevelSlice";
import storage from "./storage";

const PERSIST_CONFIG_KEY = "salsadsid";

export const reducers = combineReducers({
  sugarLevel: sugarLevelSlice,
});
export const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  storage,
};
