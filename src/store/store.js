import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware().concat(logger),
});

export default store;
