import { configureStore } from "@reduxjs/toolkit";
import startshipReducer from "./starships/starshipsSlice";
const store = configureStore({
  reducer: {
    starships: startshipReducer,
  },
});

export default store;
