import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allusers: [],
}

export const UserSlice = createSlice({
  name: "allusers",
  initialState,
  reducers: {
    getAllUsers: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllUsers } = UserSlice.actions;

export default UserSlice.reducer;
