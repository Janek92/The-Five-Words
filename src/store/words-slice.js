import { createSlice } from "@reduxjs/toolkit";

const words = {
  eventDelay: 150,
  endpoints: [],
  endpointsDaily: [],
  endpointsHistory: [],
};

const drawWords = createSlice({
  name: "draw",
  initialState: words,
  reducers: {
    saveFetched(state, action) {
      state.endpoints = action.payload;
    },
    saveDaily(state, action) {
      state.endpointsDaily = action.payload;
    },
    saveHistory(state, action) {
      state.endpointsHistory = action.payload;
    },
  },
});

export const drawWordsActions = drawWords.actions;
export default drawWords;
