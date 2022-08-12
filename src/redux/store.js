import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/LoginSlice";
import UserReducer from "./reducers/UserSlice";
import TransactionReducer from "./reducers/TransactionSlice";
import OrderReducer from "./reducers/OrderSlice";
import ProductReducer from "./reducers/ProductSlice";
import RoomReducer from "./reducers/RoomSlice";
import ShopReducer from "./reducers/ShopSlice";
import ClubSlice from "./reducers/ClubSlice";
import CurrentUserSlice from "./reducers/CurrentUserSlice";
export default configureStore({
  reducer: {
    login: LoginReducer,
    allusers: UserReducer,
    transaction: TransactionReducer,
    orders: OrderReducer,
    product: ProductReducer,
    rooms: RoomReducer,
    shops: ShopReducer,
    clubs: ClubSlice,
    currentUser: CurrentUserSlice,
  },
});
