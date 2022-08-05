import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
}

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginProcess: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginProcess } = LoginSlice.actions;

export default LoginSlice.reducer;
