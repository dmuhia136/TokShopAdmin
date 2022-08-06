import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: [],
}

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    getTransactions: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTransactions } = TransactionSlice.actions;

export default TransactionSlice.reducer;
