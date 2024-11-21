// features/mode/modeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode(state, action) {
      return action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
