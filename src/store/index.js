import { configureStore } from "@reduxjs/toolkit";
import drawWords from "./words-slice";

const store = configureStore({
  reducer: { draw: drawWords.reducer },
});

export default store;
