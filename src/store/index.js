import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import wordsSlice from "./words-slice";

const store = configureStore({
  reducer: { words: wordsSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
