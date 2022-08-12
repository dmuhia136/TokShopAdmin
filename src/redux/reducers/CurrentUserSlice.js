import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: [],
}

export const CurrentUserSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    getUser: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser } = CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;
