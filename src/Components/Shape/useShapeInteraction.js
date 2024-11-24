import { useState, useEffect, useCallback } from "react";

const useShapeInteraction = (shape, updateShape, selectShape) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragShapePoint, setDragShapePoint] = useState({ x: 0, y: 0 });
  const [initialShapeState, setInitialShapeState] = useState({
    position: { x: 0, y: 0 },
    size: { x: 0, y: 0 },
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  });

  const handleMouseDown = (e, type) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeType(type);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragShapePoint({
      x: e.clientX - (shape.position?.x || 0),
      y: e.clientY - (shape.position?.y || 0),
    });
    setInitialShapeState({
      position: { ...shape.position },
      size: { ...shape.size },
      startPoint: { ...shape.startPoint },
      endPoint: { ...shape.endPoint },
    });
    selectShape(shape.id);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      let newPosition = { ...initialShapeState.position };
      let newSize = { ...initialShapeState.size };
      let newStartPoint = { ...initialShapeState.startPoint };
      let newEndPoint = { ...initialShapeState.endPoint };

      if (shape.type === "line") {
        const offsetX = e.clientX - dragStart.x;
        const offsetY = e.clientY - dragStart.y;
        switch (resizeType) {
          case "center":
            newStartPoint.x = initialShapeState.startPoint.x + offsetX;
            newStartPoint.y = initialShapeState.startPoint.y + offsetY;
            newEndPoint.x = initialShapeState.endPoint.x + offsetX;
            newEndPoint.y = initialShapeState.endPoint.y + offsetY;

            break;

          case "startPoint":
            newStartPoint.x = initialShapeState.startPoint.x + offsetX;
            newStartPoint.y = initialShapeState.startPoint.y + offsetY;
            break;

          case "endPoint":
            newEndPoint.x = initialShapeState.endPoint.x + offsetX;
            newEndPoint.y = initialShapeState.endPoint.y + offsetY;
            break;

          default:
            break;
        }

        updateShape(shape.id, {
          startPoint: newStartPoint,
          endPoint: newEndPoint,
        });
      } else {
        switch (resizeType) {
          case "center":
            newPosition.x = e.clientX - dragShapePoint.x;
            newPosition.y = e.clientY - dragShapePoint.y;
            break;

          case "left":
            newPosition.x = Math.min(
              e.clientX - dragShapePoint.x,
              initialShapeState.position.x + initialShapeState.size.x
            );
            newSize.x = initialShapeState.size.x - deltaX;
            break;

          case "right":
            newSize.x = initialShapeState.size.x + deltaX;
            break;

          case "top":
            newPosition.y = Math.min(
              e.clientY - dragShapePoint.y,
              initialShapeState.position.y + initialShapeState.size.y
            );
            newSize.y = initialShapeState.size.y - deltaY;
            break;

          case "bottom":
            newSize.y = initialShapeState.size.y + deltaY;
            break;

          case "top-left":
            newPosition.x = Math.min(
              e.clientX - dragShapePoint.x,
              initialShapeState.position.x + initialShapeState.size.x
            );
            newPosition.y = Math.min(
              e.clientY - dragShapePoint.y,
              initialShapeState.position.y + initialShapeState.size.y
            );
            newSize.x = initialShapeState.size.x - deltaX;
            newSize.y = initialShapeState.size.y - deltaY;
            break;

          case "top-right":
            newPosition.y = Math.min(
              e.clientY - dragShapePoint.y,
              initialShapeState.position.y + initialShapeState.size.y
            );
            newSize.x = initialShapeState.size.x + deltaX;
            newSize.y = initialShapeState.size.y - deltaY;
            break;

          case "bottom-left":
            newPosition.x = Math.min(
              e.clientX - dragShapePoint.x,
              initialShapeState.position.x + initialShapeState.size.x
            );
            newSize.x = initialShapeState.size.x - deltaX;
            newSize.y = initialShapeState.size.y + deltaY;
            break;

          case "bottom-right":
            newSize.x = initialShapeState.size.x + deltaX;
            newSize.y = initialShapeState.size.y + deltaY;
            break;

          default:
            break;
        }

        const minSize = 10;
        newSize.x = Math.max(newSize.x, minSize);
        newSize.y = Math.max(newSize.y, minSize);

        updateShape(shape.id, {
          position: newPosition,
          size: newSize,
        });
      }
    },
    [
      isResizing,
      resizeType,
      dragStart,
      dragShapePoint,
      initialShapeState,
      shape.id,
      shape.type,
      updateShape,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);
    setResizeType(null);
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    handleMouseDown,
  };
};

export default useShapeInteraction;
