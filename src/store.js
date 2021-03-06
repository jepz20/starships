import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import starshipReducer from "./starships/starshipsSlice";

const transform = createTransform(
  (inboundState, key) => {
    return {
      ...inboundState,
      error: null,
      status: "idle",
    };
  },
  (outboundState, key) => {
    return {
      ...outboundState,
    };
  },
  { whitelist: "starships" }
);
const rootReducer = combineReducers({
  starships: starshipReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [transform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
