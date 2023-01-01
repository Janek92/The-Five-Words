import { createSlice } from "@reduxjs/toolkit";

const words = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  eventDelay: 150,
  endpoints: [],
  endpointsDaily: [],
  endpointsHistory: [],
  wordsToPractice: [],
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
    saveUser(state, action) {
      state.currentUser = action.payload;
    },
    savePractice(state, action) {
      state.wordsToPractice = action.payload;
    },
  },
});

export const drawWordsActions = drawWords.actions;
export default drawWords;
