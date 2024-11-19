// features/canvas/useCanvas.js

import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";
import {
  addCanvasObject,
  updateCanvasObject,
  removeCanvasObject,
  setSelectedCanvasObjectId,
} from "./canvasSlice";

const useCanvas = () => {
  const dispatch = useDispatch();

  // 상태를 메모이제이션하여 불필요한 리렌더링 방지
  const canvasObjects = useSelector((state) => state.canvas.canvasObjects);
  const memoizedCanvasObjects = useMemo(() => canvasObjects, [canvasObjects]);

  const canvasObjectIds = useSelector((state) => state.canvas.canvasObjectIds);
  const memoizedCanvasObjectIds = useMemo(
    () => canvasObjectIds,
    [canvasObjectIds]
  );

  const selectedCanvasObjectId = useSelector(
    (state) => state.canvas.selectedCanvasObjectId
  );

  // 액션 디스패치 함수를 useCallback으로 감싸서 참조의 안정성 확보
  const addObject = useCallback(
    (object) => {
      dispatch(addCanvasObject(object));
    },
    [dispatch]
  );

  const updateObject = useCallback(
    (object) => {
      dispatch(updateCanvasObject(object));
    },
    [dispatch]
  );

  const removeObject = useCallback(
    (id) => {
      dispatch(removeCanvasObject(id));
    },
    [dispatch]
  );

  const selectObject = useCallback(
    (id) => {
      dispatch(setSelectedCanvasObjectId(id));
    },
    [dispatch]
  );

  return {
    canvasObjects: memoizedCanvasObjects,
    canvasObjectIds: memoizedCanvasObjectIds,
    selectedCanvasObjectId,
    addObject,
    updateObject,
    removeObject,
    selectObject,
  };
};

export default useCanvas;
