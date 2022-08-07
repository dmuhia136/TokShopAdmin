import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
}

export const RoomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getAlRooms: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAlRooms } = RoomSlice.actions;

export default RoomSlice.reducer;
