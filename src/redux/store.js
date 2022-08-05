import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/LoginSlice";
export default configureStore({
  reducer: {
    login: LoginReducer,
  },
});
