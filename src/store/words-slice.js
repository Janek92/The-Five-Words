import { createSlice } from "@reduxjs/toolkit";

const wordsState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  eventDelay: 150,
  endpoints: JSON.parse(localStorage.getItem(`for-draw`)) || 0,
  endpointsDaily: JSON.parse(localStorage.getItem(`daily`)) || [],
  endpointsHistory: JSON.parse(localStorage.getItem(`history`)) || [],
  wordsToPractice: JSON.parse(localStorage.getItem(`practice`)) || [],
};

const wordsSlice = createSlice({
  name: "words",
  initialState: wordsState,
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

export const wordsActions = wordsSlice.actions;
export default wordsSlice;
