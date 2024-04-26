import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import counterReducer from "./counterSlice";
import { userLocationHistoryReducer } from "./userLocationHistory";
import { showListingsReducer } from "./showListings";
import { showWelcomeToastReducer } from "./showToast";

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  showWelcomeToast: showWelcomeToastReducer,
});

const persistData = persistReducer(
  {
    // these are persist config
    key: "root",
    storage,
    version: 1,
  },
  rootReducer
);

export const store = configureStore({
  reducer: {
    persistData,
    locationHistory: userLocationHistoryReducer,
    showListings: showListingsReducer,
  },

  // check the definition of this middleware
  middleware: (getDefaultMiddlerware) =>
    getDefaultMiddlerware({
      serializableCheck: false,
    }),
  // we should add something here from video that i dont know what it is watch the video
});

export const persistor = persistStore(store);
