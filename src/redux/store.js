import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/LoginSlice";
import UserReducer from "./reducers/UserSlice";
import TransactionReducer from "./reducers/TransactionSlice";
import OrderReducer from "./reducers/OrderSlice";
export default configureStore({
  reducer: {
    login: LoginReducer,
    allusers: UserReducer,
    transaction: TransactionReducer,
    orders: OrderReducer,
  },
});
