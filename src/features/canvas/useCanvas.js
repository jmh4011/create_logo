import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  addShape as addObject,
  updateShape as updateObject,
  removeShape as removeObject,
  setSelectedShapeId,
} from "./canvasSlice";

const useCanvas = () => {
  const dispatch = useDispatch();

  const shapes = useSelector((state) => state.canvas.shapes);
  const shapeIds = useSelector((state) => state.canvas.shapeIds);
  const selectedShapeId = useSelector((state) => state.canvas.selectedShapeId);

  const addShape = useCallback(
    (shape) => {
      dispatch(addObject(shape));
    },
    [dispatch]
  );

  const updateShape = useCallback(
    (id, properties) => {
      dispatch(updateObject({ id, properties }));
    },
    [dispatch]
  );

  const removeShape = useCallback(
    (id) => {
      dispatch(removeObject(id));
    },
    [dispatch]
  );

  const selectShape = useCallback(
    (id) => {
      dispatch(setSelectedShapeId(id));
    },
    [dispatch]
  );

  return {
    shapes,
    shapeIds,
    selectedShapeId,
    addShape,
    updateShape,
    removeShape,
    selectShape,
  };
};

export default useCanvas;
