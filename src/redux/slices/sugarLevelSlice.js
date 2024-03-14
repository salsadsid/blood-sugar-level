import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sugarLevel: null,
  savedSugarLevel: [],
};

export const sugarLevelSlice = createSlice({
  name: "sugar",
  initialState,
  reducers: {
    setSugarLevel: (state, { payload }) => {
      state.sugarLevel = payload;
    },
    setSavedSugarLevel: (state, { payload }) => {
      state.savedSugarLevel = [...state.savedSugarLevel, payload];
    },
  },
});

export const { setSugarLevel, setSavedSugarLevel } = sugarLevelSlice.actions;

export default sugarLevelSlice.reducer;
