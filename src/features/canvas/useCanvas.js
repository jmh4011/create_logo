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
      // position과 size 속성을 정수로 변환
      const normalizedProperties = { ...properties };

      if (normalizedProperties.position) {
        normalizedProperties.position = {
          x: Math.round(normalizedProperties.position.x),
          y: Math.round(normalizedProperties.position.y),
        };
      }

      if (normalizedProperties.size) {
        normalizedProperties.size = {
          x: Math.round(normalizedProperties.size.x),
          y: Math.round(normalizedProperties.size.y),
        };
      }

      dispatch(updateObject({ id, properties: normalizedProperties }));
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
