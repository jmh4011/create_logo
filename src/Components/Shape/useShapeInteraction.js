import { useState, useEffect, useCallback } from "react";

const useShapeInteraction = (shape, updateShape, selectShape) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragShapeStart, setDragShapeStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, type) => {
    e.stopPropagation();
    e.preventDefault(); // 기본 동작 방지
    setIsResizing(true);
    setResizeType(type);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragShapeStart({
      x: shape.position.x - e.clientX,
      y: shape.position.y - e.clientY,
    });
    selectShape(shape.id);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const dragPointX = e.clientX + dragShapeStart.x;
      const dragPointY = e.clientY + dragShapeStart.y;

      let newPosition = { ...shape.position };
      let newSize = { ...shape.size };

      switch (resizeType) {
        case "center":
          newPosition.x = dragPointX;
          newPosition.y = dragPointY;
          break;

        case "left":
          newPosition.x += deltaX;
          newSize.width -= deltaX;
          break;

        case "right":
          newSize.width += deltaX;
          break;

        case "top":
          newPosition.y += deltaY;
          newSize.height -= deltaY;
          break;

        case "bottom":
          newSize.height += deltaY;
          break;

        case "top-left":
          newPosition.x += deltaX;
          newPosition.y += deltaY;
          newSize.width -= deltaX;
          newSize.height -= deltaY;
          break;

        case "top-right":
          newPosition.y += deltaY;
          newSize.width += deltaX;
          newSize.height -= deltaY;
          break;

        case "bottom-left":
          newPosition.x += deltaX;
          newSize.width -= deltaX;
          newSize.height += deltaY;
          break;

        case "bottom-right":
          newSize.width += deltaX;
          newSize.height += deltaY;
          break;

        default:
          break;
      }

      // 최소 크기 제한 (옵션)
      const minSize = 10;
      newSize.width = Math.max(newSize.width, minSize);
      newSize.height = Math.max(newSize.height, minSize);

      updateShape(shape.id, {
        position: newPosition,
        size: newSize,
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isResizing, resizeType, dragStart, shape, updateShape]
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
