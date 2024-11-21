import { useState } from "react";

const useShapeInteraction = (shape, updateShape, selectShape) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, type) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeType(type);
    setDragStart({ x: e.clientX, y: e.clientY });
    selectShape(shape.id);

    // 전역 이벤트 리스너 추가
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (resizeType === "center") {
      updateShape(shape.id, {
        position: {
          x: shape.position.x + deltaX,
          y: shape.position.y + deltaY,
        },
      });
    } else if (resizeType === "left") {
      updateShape(shape.id, {
        size: {
          width: shape.size.width - deltaX,
          height: shape.size.height,
        },
        position: {
          x: shape.position.x + deltaX,
          y: shape.position.y,
        },
      });
    } else if (resizeType === "right") {
      updateShape(shape.id, {
        size: {
          width: shape.size.width + deltaX,
          height: shape.size.height,
        },
      });
    } else if (resizeType === "top") {
      updateShape(shape.id, {
        size: {
          width: shape.size.width,
          height: shape.size.height - deltaY,
        },
        position: {
          x: shape.position.x,
          y: shape.position.y + deltaY,
        },
      });
    } else if (resizeType === "bottom") {
      updateShape(shape.id, {
        size: {
          width: shape.size.width,
          height: shape.size.height + deltaY,
        },
      });
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeType(null);

    // 전역 이벤트 리스너 제거
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useShapeInteraction;
