// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import modeReducer from "./features/mode/modeSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    mode: modeReducer,
  },
});

export default store;
