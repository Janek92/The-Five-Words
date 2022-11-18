import { createSlice } from "@reduxjs/toolkit";

const words = {
  endPoints: [],
  endPointsFiltered: [],
};

const drawWords = createSlice({
  name: "draw",
  initialState: words,
  reducers: {
    wordsForFetch(state, action) {
      state.endPoints = action.payload;
    },
    saveFiltered(state, action) {
      state.endPointsFiltered = action.payload;
    },
  },
});

export const drawWordsActions = drawWords.actions;
export default drawWords;
