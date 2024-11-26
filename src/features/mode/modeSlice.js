// features/mode/modeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: null,
  selectedIcon: null,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
      state.selectedIcon = null;
    },
    setSelectedIcon(state, action) {
      state.selectedIcon = action.payload;
      state.mode = "icon";
    },
    resetMode(state) {
      state.mode = null;
      state.selectedIcon = null;
    },
  },
});

export const { setMode, setSelectedIcon, resetMode } = modeSlice.actions;
export default modeSlice.reducer;
