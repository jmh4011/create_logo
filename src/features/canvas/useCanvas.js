// features/canvas/useCanvas.js

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

  // 상태를 메모이제이션하여 불필요한 리렌더링 방지
  const shapes = useSelector((state) => state.canvas.Shapes);

  const shapeIds = useSelector((state) => state.canvas.ShapeIds);

  const selectedShapeId = useSelector((state) => state.canvas.selectedShapeId);

  // 액션 디스패치 함수를 useCallback으로 감싸서 참조의 안정성 확보
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
