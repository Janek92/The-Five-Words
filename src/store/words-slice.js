import { createSlice } from "@reduxjs/toolkit";

const words = {
  endpoints: [],
  endpointsFiltered: [],
};

const drawWords = createSlice({
  name: "draw",
  initialState: words,
  reducers: {
    saveFetched(state, action) {
      state.endpoints = action.payload;
    },
    saveFiltered(state, action) {
      state.endpointsFiltered = action.payload;
    },
  },
});

export const drawWordsActions = drawWords.actions;
export default drawWords;
