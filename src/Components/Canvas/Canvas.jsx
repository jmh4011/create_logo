import React, { useRef, useState, useEffect } from "react";
import useRectangle from "./useRectangle";
import useCircle from "./useCircle";
import useLine from "./useLine";

const Canvas = () => {
  const canvasRef = useRef(null);
  const rectangle = useRectangle();
  const circle = useCircle();
  const line = useLine();
  const [idCount, setIdCount] = useState(1);
  const [mode, setMode] = useState("rectangle"); // 'rectangle' | 'circle' | 'line' | 'move' 모드를 설정
  const [dragStart, setDragStart] = useState(null);
  const [canvasObjects, setCanvasObjects] = useState({});
  const [canvasObjectIds, setCanvasObjectIds] = useState([]);
  const [draggingObject, setDraggingObject] = useState(null);
  const [selectedRectId, setSelectedRectId] = useState();
  const [point, setPoint] = useState({ x: 0, y: 0 });

  // 추가된 히스토리 관리
  const [history, setHistory] = useState([]); // 이전 상태들을 저장하는 배열
  const [redoHistory, setRedoHistory] = useState([]); // redo를 위한 히스토리

  const draw = (context, canvasObject, isSelected = false) => {
    switch (canvasObject.type) {
      case "rectangle":
        rectangle.draw(context, canvasObject, isSelected);
        break;
      case "circle":
        circle.draw(context, canvasObject, isSelected);
        break;
      case "line":
        line.draw(context, canvasObject, isSelected);
        break;
      default:
        console.error("Unknown type:", canvasObject.type);
    }
  };

  const isClicked = (canvasObject, x, y) => {
    switch (canvasObject.type) {
      case "rectangle":
        return rectangle.isClicked(canvasObject, x, y);
      case "circle":
        return circle.isClicked(canvasObject, x, y);
      case "line":
        return line.isClicked(canvasObject, x, y);
      default:
        console.error("Unknown type:", canvasObject.type);
        return false;
    }
  };

  const createObject = (id, startX, startY, endX, endY) => {
    switch (mode) {
      case "rectangle":
        return rectangle.create(id, startX, startY, endX, endY);
      case "circle":
        return circle.create(id, startX, startY, endX, endY);
      case "line":
        return line.create(id, startX, startY, endX, endY);
      default:
        console.error("Unknown type:", mode);
        return null;
    }
  };

  // 히스토리에 현재 상태 추가
  const addHistory = () => {
    setRedoHistory([]);
    setHistory((prev) => [
      ...prev,
      { objects: { ...canvasObjects }, ids: [...canvasObjectIds] },
    ]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    canvasObjectIds.forEach((id) => {
      const isSelected = id === selectedRectId || draggingObject?.id === id;
      draw(context, canvasObjects[id], true);
    });

    if (draggingObject) {
      draw(context, draggingObject, true);
    }
  }, [canvasObjects, canvasObjectIds, draw, draggingObject]);

  const handleMouseDown = (e) => {
    addHistory();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "move") {
      canvasObjectIds.forEach((id) => {
        if (isClicked(canvasObjects[id], x, y)) {
          setSelectedRectId(id);
          setPoint({
            x: x - canvasObjects[id].positionX,
            y: y - canvasObjects[id].positionY,
          });
        }
      });
    } else {
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode !== "move" && dragStart) {
      const createdObject = createObject(null, dragStart.x, dragStart.y, x, y);
      setDraggingObject({ ...createdObject, color: "rgb(0, 0, 0)" });
    } else if (mode === "move" && selectedRectId !== null) {
      setCanvasObjects((prev) => ({
        ...prev,
        [selectedRectId]: {
          ...prev[selectedRectId],
          positionX: x - point.x,
          positionY: y - point.y,
        },
      }));
    }
  };

  const handleMouseUp = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragStart) {
      const createdObject = createObject(
        idCount,
        dragStart.x,
        dragStart.y,
        x,
        y
      );
      if (createdObject) {
        setCanvasObjects((prev) => ({
          ...prev,
          [idCount]: createdObject,
        }));
        setCanvasObjectIds((prev) => [...prev, idCount]);
        setIdCount(idCount + 1);
      }

      setDraggingObject(null);
      setDragStart(null);
    }

    setSelectedRectId(null);
  };

  // Ctrl+Z 기능 구현
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        if (history.length > 0) {
          const prevState = history[history.length - 1];
          setCanvasObjects(prevState.objects);
          setCanvasObjectIds(prevState.ids);

          // redo 히스토리에 현재 상태 저장
          setRedoHistory((prev) => [
            ...prev,
            { objects: { ...canvasObjects }, ids: [...canvasObjectIds] },
          ]);

          // 히스토리에서 마지막 상태 제거
          setHistory((prev) => prev.slice(0, -1));
        }
      }
      // Ctrl+Y 기능으로 되돌리기 (redo)
      if (e.ctrlKey && e.key === "y") {
        if (redoHistory.length > 0) {
          const nextState = redoHistory[redoHistory.length - 1];
          setCanvasObjects(nextState.objects);
          setCanvasObjectIds(nextState.ids);

          // 히스토리에 복구된 상태 추가
          setHistory((prev) => [
            ...prev,
            { objects: { ...canvasObjects }, ids: [...canvasObjectIds] },
          ]);

          // redo 히스토리에서 마지막 상태 제거
          setRedoHistory((prev) => prev.slice(0, -1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasObjects, canvasObjectIds, history, redoHistory]);

  return (
    <div>
      <div>
        <button onClick={() => setMode("rectangle")}>Rectangle</button>
        <button onClick={() => setMode("circle")}>Circle</button>
        <button onClick={() => setMode("line")}>Line</button>
        <button onClick={() => setMode("move")}>Move Mode</button>
        <button onClick={() => console.log(canvasObjects, canvasObjectIds)}>
          log
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
