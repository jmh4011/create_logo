import { useRef, useState, useEffect } from "react";
import useRectangle from "./useRectangle";
import useCircle from "./useCircle";
import useLine from "./useLine";
import useTextBoxType1 from "./useTextBoxType1";
import useTextBoxType2 from "./useTextBoxType2";
import useTextBoxManager from "./useTextBoxManager";

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
  const textBoxType1 = useTextBoxType1();
  const textBoxType2 = useTextBoxType2();

  const [idCount, setIdCount] = useState(1);
  const [dragStart, setDragStart] = useState(null);
  const [draggingObject, setDraggingObject] = useState(null);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  const {
    selectedTextBoxId,
    inputText,
    inputPosition,
    inputRef,
    setInputText,
    calculateTextWidth,
    startEditing,
    updateText,
  } = useTextBoxManager(canvasObjects, setCanvasObjects);

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
      case "textBoxType1":
        textBoxType1.draw(context, canvasObject, isSelected);
        break;
      case "textBoxType2":
        textBoxType2.draw(context, canvasObject, isSelected);
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
      case "textBoxType1":
        return textBoxType1.isClicked(canvasObject, x, y);
      case "textBoxType2":
        return textBoxType2.isClicked(canvasObject, x, y);
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
      case "textBoxType1":
        return textBoxType1.create(id, startX, startY, endX, endY);
      case "textBoxType2":
        return textBoxType2.create(id, startX, startY, endX, endY);
      default:
        console.error("Unknown type:", mode);
        return null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    canvasObjectIds.forEach((id) => {
      const isSelected = id === selectedObjectId;
      draw(context, canvasObjects[id], isSelected);
    });

    if (draggingObject) {
      draw(context, draggingObject, true);
    }
  }, [canvasObjects, canvasObjectIds, draw, draggingObject]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "move") {
      canvasObjectIds.forEach((id) => {
        if (isClicked(canvasObjects[id], x, y)) {
          if (canvasObjects[id].type.includes("textBox")) {
            startEditing(
              id,
              canvasObjects[id].text,
              {
                x: canvasObjects[id].positionX,
                y: canvasObjects[id].positionY,
              },
              canvasObjects[id].fontSize
            );
          } else {
            setSelectedObjectId(id);
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

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode !== "move" && dragStart) {
      const createdObject = createObject(null, dragStart.x, dragStart.y, x, y);
      setDraggingObject({ ...createdObject, color: "rgb(0, 0, 0)" });
    } else if (mode === "move" && selectedObjectId !== null) {
      setCanvasObjects((prev) => ({
        ...prev,
        [selectedObjectId]: {
          ...prev[selectedObjectId],
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

    setSelectedObjectId(null);
  };

  return (
    <div style={{ position: "relative" }}>
      {selectedTextBoxId && (
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={updateText}
          onKeyDown={(e) => e.key === "Enter" && updateText()}
          style={{
            position: "absolute",
            width: `${calculateTextWidth(
              inputText,
              `${canvasObjects[selectedTextBoxId]?.fontSize}px ${canvasObjects[selectedTextBoxId]?.fontStyle}`
            )}px`,
            left: `${inputPosition.x}px`,
            top: `${inputPosition.y}px`,
            fontSize: `${canvasObjects[selectedTextBoxId]?.fontSize}px`,
            fontFamily: canvasObjects[selectedTextBoxId]?.fontStyle,
            padding: "0",
            border: "none",
            outline: "none",
            background: "transparent",
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
