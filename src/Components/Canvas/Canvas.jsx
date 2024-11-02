import { useRef, useState, useEffect } from "react";
import useRectangle from "./useRectangle";
import useCircle from "./useCircle";
import useLine from "./useLine";
import useTextBox from "./useTextBox";

const Canvas = ({
  mode,
  canvasObjects,
  canvasObjectIds,
  setCanvasObjects,
  setCanvasObjectIds,
}) => {
  const canvasRef = useRef(null);
  const rectangle = useRectangle();
  const circle = useCircle();
  const line = useLine();
  const textBox = useTextBox();
  const [idCount, setIdCount] = useState(1);
  const [dragStart, setDragStart] = useState(null);
  const [draggingObject, setDraggingObject] = useState(null);
  const [selectedRectId, setSelectedRectId] = useState();
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [selectedTextBoxId, setSelectedTextBoxId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

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
      case "textBox":
        textBox.draw(context, canvasObject, isSelected);
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
      case "textBox":
        return textBox.isClicked(canvasObject, x, y);
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
      case "textBox":
        return textBox.create(id, startX, startY, endX, endY);
      default:
        console.error("Unknown type:", mode);
        return null;
    }
  };

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
          if (canvasObjects[id].type === "textBox") {
            setSelectedTextBoxId(id);
            setInputText(canvasObjects[id].text); // 선택된 텍스트 박스의 텍스트 설정
            setInputPosition({
              x: canvasObjects[id].positionX,
              y: canvasObjects[id].positionY,
            });
            console.log(selectedTextBoxId, inputText, inputPosition);
          } else {
            setSelectedRectId(id);
            setPoint({
              x: x - canvasObjects[id].positionX,
              y: y - canvasObjects[id].positionY,
            });
          }
        }
      });
    } else {
      setDragStart({ x, y });
    }
  };

  const updateText = () => {
    if (selectedTextBoxId) {
      setCanvasObjects((prev) => ({
        ...prev,
        [selectedTextBoxId]: { ...prev[selectedTextBoxId], text: inputText },
      }));
      setSelectedTextBoxId(null); // 텍스트 변경 후 선택 해제
      setInputText(""); // 입력 필드 초기화
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "blue";
    context.lineWidth = 2;

    context.strokeRect(dragStart.x, dragStart.y, x, y);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
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
      }
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
    <div style={{ position: "relative" }}>
      {selectedTextBoxId && (
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={updateText} // 포커스를 잃으면 텍스트 업데이트
          onKeyDown={(e) => e.key === "Enter" && updateText()} // Enter 키로 텍스트 업데이트
          style={{
            position: "absolute",
            left: `${inputPosition.x}px`,
            top: `${inputPosition.y}px`,
            fontSize: `${canvasObjects[selectedTextBoxId]?.fontSize}px`,
            fontFamily: canvasObjects[selectedTextBoxId]?.fontStyle,
          }}
        />
      )}
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
