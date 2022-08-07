import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clubs: [],
}

export const ClubSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    getAllClubs: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllClubs } = ClubSlice.actions;

export default ClubSlice.reducer;
