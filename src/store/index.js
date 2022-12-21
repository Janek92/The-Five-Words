import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import drawWords from "./words-slice";

const store = configureStore({
  reducer: { draw: drawWords.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
