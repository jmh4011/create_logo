import React, { useCallback, useEffect, useRef, useState } from "react";
import Shape from "../Shape/Shape";
import useCanvas from "../../features/canvas/useCanvas";
import useMode from "../../features/mode/useMode";
import ContextMenu from "./ContextMenu";

const Canvas = () => {
  const { shapeIds, createShape, updateShape } = useCanvas();
  const canvasRef = useRef(null);
  const { mode, selectedIcon, resetMode } = useMode();
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [contextShapeId, setContextShapeId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [draggingShapeId, setDraggingShapeId] = useState(null);

  const fixelToPercent = useCallback((e) => {
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();

    const clickX = e.clientX - rect.left; // div의 좌측으로부터의 클릭 위치
    const clickY = e.clientY - rect.top; // div의 상단으로부터의 클릭 위치

    const x = (clickX / rect.width) * 100;
    const y = (clickY / rect.height) * 100;

    return { x, y };
  });

  const handleMouseDown = (e) => {
    const { x, y } = fixelToPercent(e);

    setDragStart({ x, y });

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

    let shapeId = createShape(mode, { x, y }, customProperties).id;
    setDraggingShapeId(shapeId);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { x, y } = fixelToPercent(e);

    dragMove(x, y);
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
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {shapeIds &&
        shapeIds.map((id) => (
          <div onContextMenu={(e) => openContextMenu(e, id)} key={id}>
            <Shape id={id} canvasRef={canvasRef} />
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
