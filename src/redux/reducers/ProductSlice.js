import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
}

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
