import React, { useEffect, useState } from "react";
import Shape from "../Shape/Shape";
import useCanvas from "../../features/canvas/useCanvas";
import useMode from "../../features/mode/useMode";
import ContextMenu from "./ContextMenu";

const Canvas = () => {
  const {
    shapes,
    shapeIds,
    selectedShapeId,
    createShape,
    updateShape,
    removeShape,
    selectShape,
  } = useCanvas();

  const { mode, selectedIcon, resetMode } = useMode();
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [contextShapeId, setContextShapeId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);

  const [dragCreateMode, setDragCreateMode] = useState(true);

  const [draggingShapeId, setDraggingShapeId] = useState(null);

  const handleMouseDown = (e) => {
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - canvasRect.left;
    const startY = e.clientY - canvasRect.top;

    setDragStart({ x: startX, y: startY });

    if (mode === null) {
      setIsDrawing(false);
      return;
    }
    setIsDrawing(true);

    let customProperties = {};
    if (mode === "icon") {
      customProperties = {
        iconName: selectedIcon,
      };
    }

    let shapeId = createShape(
      mode,
      { x: startX, y: startY },
      customProperties
    ).id;
    setDraggingShapeId(shapeId);
  };

  const dragCreate = (id, startX, startY) => {
    switch (mode) {
      case "rectangle":
      case "circle":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { x: 0, y: 0 },
          color: "rgb(0,0,0)",
        });
        break;
      case "line":
        addShape({
          id: id,
          type: mode,
          startPoint: { x: startX, y: startY },
          endPoint: { x: startX, y: startY },
          thickness: 5,
          color: "rgb(0,0,0)",
        });
        break;
      case "text":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { x: 0, y: 0 },
          color: "rgb(255,255,255)",
          text: "Enter text",
          fontSize: 16,
          fontColor: "rgb(0,0,0)",
        });
        break;
      case "icon":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { x: 0, y: 0 },
          color: "rgba(255,255,255, 0)",
          iconName: selectedIcon,
        });
        break;
      default:
        console.warn(`Unknown mode: ${mode}`);
        break;
    }
  };

  const basicCreate = (id, startX, startY) => {
    switch (mode) {
      case "rectangle":
      case "circle":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { x: 100, y: 100 },
          color: "rgb(0,0,0)",
        });
        break;
      case "line":
        addShape({
          id: id,
          type: mode,
          startPoint: { x: startX, y: startY },
          endPoint: { x: startX + 100, y: startY },
          thickness: 5,
          color: "rgb(0,0,0)",
        });
        break;
      case "text":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { x: 50, y: 50 },
          color: "rgb(255,255,255)",
          text: "Enter text",
          fontSize: 16,
          fontColor: "rgb(0,0,0)",
        });
        break;
      default:
        console.warn(`Unknown mode: ${mode}`);
        break;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - canvasRect.left;
    const currentY = e.clientY - canvasRect.top;

    if (dragCreateMode) {
      dragMove(currentX, currentY);
    } else {
      basicMove(currentX, currentY);
    }
  };

  const dragMove = (currentX, currentY) => {
    const width = Math.abs(currentX - dragStart.x);
    const height = Math.abs(currentY - dragStart.y);
    const positionX = Math.min(currentX, dragStart.x);
    const positionY = Math.min(currentY, dragStart.y);

    switch (mode) {
      case "rectangle":
      case "circle":
      case "text":
      case "icon":
        updateShape(draggingShapeId, {
          position: { x: positionX, y: positionY },
          size: { x: width, y: height },
        });
        break;
      case "line":
        updateShape(draggingShapeId, {
          startPoint: { x: dragStart.x, y: dragStart.y },
          endPoint: { x: currentX, y: currentY },
        });
        break;
      default:
        console.warn(`Unknown mode: ${mode}`);
        break;
    }
  };

  const basicMove = (currentX, currentY) => {
    switch (mode) {
      case "rectangle":
      case "circle":
      case "text":
      case "icon":
        updateShape(draggingShapeId, {
          position: { x: currentX, y: currentY },
        });
        break;
      case "line":
        updateShape(draggingShapeId, {
          startPoint: { x: currentX, y: currentY },
          endPoint: { x: currentX + 100, y: currentY },
        });
        break;
      default:
        console.warn(`Unknown mode: ${mode}`);
        break;
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setDraggingShapeId(null);
    resetMode();
  };

  const openContextMenu = (e, id) => {
    e.preventDefault();
    setContextShapeId(id);
    setMenuPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      id="drawing-canvas"
      className="relative w-full h-full border border-black select-none bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button onClick={() => setDragCreateMode((prevMode) => !prevMode)}>
        드래그 생성 모드 변경
      </button>

      {shapeIds &&
        shapeIds.map((id) => (
          <div onContextMenu={(e) => openContextMenu(e, id)} key={id}>
            <Shape id={id} />
          </div>
        ))}

      {menuPosition && contextShapeId !== null && (
        <div onMouseDown={(e) => e.stopPropagation()}>
          <ContextMenu
            id={contextShapeId}
            position={menuPosition}
            onClose={() => setContextShapeId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Canvas;
