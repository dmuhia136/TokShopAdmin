import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shops: [],
}

export const ShopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    getAllShops: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllShops } = ShopSlice.actions;

export default ShopSlice.reducer;
