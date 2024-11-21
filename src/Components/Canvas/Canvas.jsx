import React, { useEffect, useState } from "react";
import Shape from "../Shape/Shape";
import DetailMenu from "./DetailMenu";
import useCanvas from "../../features/canvas/useCanvas";
import useMode from "../../features/mode/useMode";

const Canvas = ({}) => {
  const {
    shapes,
    shapeIds,
    selectShapeId,
    addShape,
    updateShape,
    removeShape,
    selectShape,
  } = useCanvas();

  const { mode, changeMode } = useMode();
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [menuPosition, setMenuPosition] = useState(null);

  const [dragCreateMode, setDragCreateMode] = useState(true);

  const [draggingShapeId, setDraggingShapeId] = useState(null);

  const handleMouseDown = (e) => {
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - canvasRect.left;
    const startY = e.clientY - canvasRect.top;

    setDragStart({ x: startX, y: startY });
    if (!menuPosition) closeDetailMenu();

    if (mode === null) {
      setIsDrawing(false);
      return;
    }
    setIsDrawing(true);
    let id = shapeIds.length > 0 ? Math.max(...shapeIds) + 1 : 0;
    setDraggingShapeId(id);

    if (dragCreateMode) {
      dragCreate(id, startX, startY);
    } else {
      basicCreate(id, startX, startY);
    }
  };

  const dragCreate = (id, startX, startY) => {
    switch (mode) {
      case "rectangle":
      case "circle":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { width: 0, height: 0 },
          color: "rgb(0,0,0)",
        });
        break;
      case "line":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          endPosition: { x: startX, y: startY },
          thickness: 5,
          color: "rgb(0,0,0)",
        });
        break;
      case "text":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { width: 0, height: 0 },
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

  const basicCreate = (id, startX, startY) => {
    switch (mode) {
      case "rectangle":
      case "circle":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { width: 100, height: 100 },
          color: "rgb(0,0,0)",
        });
        break;
      case "line":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          endPosition: { x: startX + 100, y: startY },
          thickness: 5,
          color: "rgb(0,0,0)",
        });
        break;
      case "text":
        addShape({
          id: id,
          type: mode,
          position: { x: startX, y: startY },
          size: { width: 50, height: 50 },
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
        updateShape(draggingShapeId, {
          position: { x: positionX, y: positionY },
          size: { width: width, height: height },
        });
        break;
      case "line":
        updateShape(draggingShapeId, {
          position: { x: dragStart.x, y: dragStart.y },
          endPosition: { x: currentX, y: currentY },
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
        updateShape(draggingShapeId, {
          position: { x: currentX, y: currentY },
        });
        break;
      case "line":
        updateShape(draggingShapeId, {
          position: { x: currentX, y: currentY },
          endPosition: { x: currentX + 100, y: currentY },
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
    changeMode(null);
  };

  const openDetailMenu = (e, id) => {
    e.preventDefault();
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - canvasRect.left;
    const currentY = e.clientY - canvasRect.top;
    selectShape(id);
    setMenuPosition({
      x: currentX,
      y: currentY,
    });
  };

  const closeDetailMenu = () => {
    setMenuPosition(null);
    selectShape(null);
  };

  return (
    <div
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
          <div onContextMenu={(e) => openDetailMenu(e, id)} key={id}>
            <Shape id={id} />
          </div>
        ))}

      {menuPosition && selectedId !== null && (
        <div onMouseDown={(e) => e.stopPropagation()}>
          <DetailMenu
            id={selectedId}
            position={menuPosition}
            canvasObject={canvasObjects[selectedId]}
            setCanvasObject={(obj) => setCanvasObject(selectedId, obj)}
            onClose={closeDetailMenu}
            onDelete={() => handleDeleteObject(selectedId)}
          />
        </div>
      )}
    </div>
  );
};

export default Canvas;
