import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shapes: {},
  shapeIds: [],
  selectedShapeId: undefined,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addShape(state, action) {
      const obj = action.payload;
      state.shapes[obj.id] = obj;
      state.shapeIds.push(obj.id);
    },
    updateShape(state, action) {
      const { id, properties } = action.payload;
      if (!state.shapes[id]) return;
      state.shapes[id] = {
        ...state.shapes[id],
        ...properties,
      };
    },
    removeShape(state, action) {
      const id = action.payload;
      delete state.shapes[id];
      state.shapeIds = state.shapeIds.filter((objId) => objId !== id);
      if (state.selectedShapeId === id) {
        state.selectedShapeId = undefined;
      }
    },
    setSelectedShapeId(state, action) {
      state.selectedShapeId = action.payload;
    },
  },
});

export const { addShape, updateShape, removeShape, setSelectedShapeId } =
  canvasSlice.actions;

export default canvasSlice.reducer;
