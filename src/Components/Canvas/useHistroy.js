import { useState } from "react";

const useHistory = (
  canvasObjects,
  setCanvasObjects,
  canvasObjectIds,
  setCanvasObjectIds
) => {
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  const addHistory = () => {
    setRedoHistory([]);
    setHistory((prev) => [
      ...prev,
      { objects: { ...canvasObjects }, ids: [...canvasObjectIds] },
    ]);
  };

  const undo = () => {
    if (history.length > 0) {
      const prevState = history[history.length - 1];
      setCanvasObjects(prevState.objects);
      setCanvasObjectIds(prevState.ids);
      setRedoHistory((prev) => [
        ...prev,
        { objects: { ...canvasObjects }, ids: [...canvasObjectIds] },
      ]);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      setCanvasObjects(nextState.objects);
      setCanvasObjectIds(nextState.ids);
      setHistory((prev) => [
        ...prev,
        { objects: { ...canvasObjects }, ids: [...canvasObjectIds] },
      ]);
      setRedoHistory((prev) => prev.slice(0, -1));
    }
  };

  return { addHistory, undo, redo };
};

export default useHistory;
