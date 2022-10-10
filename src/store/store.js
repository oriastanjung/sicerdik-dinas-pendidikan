import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import loginSlice from "./reducers/loginSlice";
import signupSlice from "./reducers/signupSlice";
import dummyDataSlice from "./reducers/dummyDataSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signupSlice,
    dummyData: dummyDataSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
