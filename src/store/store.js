import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import loginSlice from "./reducers/loginSlice";
import signupSlice from "./reducers/signupSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signupSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
