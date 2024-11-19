// features/canvas/canvasSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canvasObjects: {},
  canvasObjectIds: [],
  selectedCanvasObjectId: undefined,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addCanvasObject(state, action) {
      const obj = action.payload;
      state.canvasObjects[obj.id] = obj;
      state.canvasObjectIds.push(obj.id);
    },
    updateCanvasObject(state, action) {
      const obj = action.payload;
      if (state.canvasObjects[obj.id]) {
        state.canvasObjects[obj.id] = obj;
      }
    },
    removeCanvasObject(state, action) {
      const id = action.payload;
      delete state.canvasObjects[id];
      state.canvasObjectIds = state.canvasObjectIds.filter(
        (objId) => objId !== id
      );
      if (state.selectedCanvasObjectId === id) {
        state.selectedCanvasObjectId = undefined;
      }
    },
    setSelectedCanvasObjectId(state, action) {
      state.selectedCanvasObjectId = action.payload;
    },
  },
});

export const {
  addCanvasObject,
  updateCanvasObject,
  removeCanvasObject,
  setSelectedCanvasObjectId,
} = canvasSlice.actions;

export default canvasSlice.reducer;
