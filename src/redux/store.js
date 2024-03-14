import { configureStore } from "@reduxjs/toolkit";
import sugarLevelSlice from "./slices/sugarLevelSlice";

const reducer = {
  sugarLevel: sugarLevelSlice,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
