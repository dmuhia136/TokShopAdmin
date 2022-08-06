import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
}

export const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getOrders } = OrderSlice.actions;

export default OrderSlice.reducer;
