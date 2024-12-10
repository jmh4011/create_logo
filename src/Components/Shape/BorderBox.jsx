import React, { useState, useEffect, useCallback } from "react";

const BorderBox = ({
  canvasRef,
  shape,
  updateShape,
  selectShape,
  isSelected,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragShapePoint, setDragShapePoint] = useState({ x: 0, y: 0 });
  const [initialShapeState, setInitialShapeState] = useState({});

  const fixelToPercent = (e) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();

    // 클릭한 위치 계산
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // %로 변환
    const x = (clickX / rect.width) * 100;
    const y = (clickY / rect.height) * 100;

    return { x, y };
  };

  const handleMouseDown = (e, type) => {
    setIsResizing(true);
    setResizeType(type);

    const { x, y } = fixelToPercent(e);

    setDragStart({ x, y });
    setDragShapePoint({
      x: x - (shape.position?.x || 0),
      y: y - (shape.position?.y || 0),
    });
    setInitialShapeState({
      position: { ...shape.position },
      size: { ...shape.size },
      startPoint: { ...shape.startPoint },
      endPoint: { ...shape.endPoint },
    });
    selectShape(shape.id);

    document.body.style.cursor = getCursorForResizeType(type);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing) return;

      e.preventDefault();

      const { x, y } = fixelToPercent(e);

      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;

      let newPosition = { ...initialShapeState.position };
      let newSize = { ...initialShapeState.size };
      let newStartPoint = { ...initialShapeState.startPoint };
      let newEndPoint = { ...initialShapeState.endPoint };

      if (shape.type === "line") {
        const offsetX = x - dragStart.x;
        const offsetY = y - dragStart.y;
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
            newPosition.x = x - dragShapePoint.x;
            newPosition.y = y - dragShapePoint.y;
            break;

          case "left":
            newPosition.x = Math.min(
              x - dragShapePoint.x,
              initialShapeState.position.x + initialShapeState.size.x
            );
            newSize.x = initialShapeState.size.x - deltaX;
            break;

          case "right":
            newSize.x = initialShapeState.size.x + deltaX;
            break;

          case "top":
            newPosition.y = Math.min(
              y - dragShapePoint.y,
              initialShapeState.position.y + initialShapeState.size.y
            );
            newSize.y = initialShapeState.size.y - deltaY;
            break;

          case "bottom":
            newSize.y = initialShapeState.size.y + deltaY;
            break;

          case "top-left":
            newPosition.x = Math.min(
              x - dragShapePoint.x,
              initialShapeState.position.x + initialShapeState.size.x
            );
            newPosition.y = Math.min(
              y - dragShapePoint.y,
              initialShapeState.position.y + initialShapeState.size.y
            );
            newSize.x = initialShapeState.size.x - deltaX;
            newSize.y = initialShapeState.size.y - deltaY;
            break;

          case "top-right":
            newPosition.y = Math.min(
              y - dragShapePoint.y,
              initialShapeState.position.y + initialShapeState.size.y
            );
            newSize.x = initialShapeState.size.x + deltaX;
            newSize.y = initialShapeState.size.y - deltaY;
            break;

          case "bottom-left":
            newPosition.x = Math.min(
              x - dragShapePoint.x,
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
    document.body.style.cursor = "";
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

  const getCursorForResizeType = (resizeType) => {
    switch (resizeType) {
      case "top-left":
        return "nw-resize";
      case "top-right":
        return "ne-resize";
      case "bottom-left":
        return "sw-resize";
      case "bottom-right":
        return "se-resize";
      case "left":
        return "ew-resize";
      case "right":
        return "ew-resize";
      case "top":
        return "ns-resize";
      case "bottom":
        return "ns-resize";
      case "startPoint":
        return "crosshair";
      case "endPoint":
        return "crosshair";
      case "center":
        return "move";
      default:
        return "default";
    }
  };

  const handleSize = 10;

  const handleStyle = {
    position: "absolute",
    width: `${handleSize}px`,
    height: `${handleSize}px`,
    backgroundColor: "#fff",
    border: "1px solid #000",
    zIndex: 2,
    boxSizing: "border-box",
    ...(isResizing && { cursor: getCursorForResizeType(resizeType) }),
  };

  const renderHandle = (positionStyles, resizeType) => (
    <div
      style={{
        ...handleStyle,
        ...positionStyles,
        ...(!isResizing && { cursor: getCursorForResizeType(resizeType) }),
      }}
      onMouseDown={(e) => handleMouseDown(e, resizeType)}
    />
  );

  let borderMargin = shape.border ? -(shape.border.width + 2) : -2;
  return (
    <div
      onMouseDown={(e) => handleMouseDown(e, "center")}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: isResizing
          ? getCursorForResizeType(resizeType)
          : getCursorForResizeType("center"),
      }}
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: borderMargin,
            left: borderMargin,
            right: borderMargin,
            bottom: borderMargin,
            borderWidth: "2px",
            borderStyle: "solid",
            borderImage: `repeating-linear-gradient(
              45deg, 
              black, black 2px, white 2px, white 4px
            ) 10 stretch`,
            borderImageSlice: 1,
            backgroundColor: "transparent",
            zIndex: 5,
          }}
        >
          {shape.type !== "line" ? (
            <>
              {renderHandle({ top: -5, left: -5 }, "top-left")}
              {renderHandle({ top: -5, right: -5 }, "top-right")}
              {renderHandle({ bottom: -5, left: -5 }, "bottom-left")}
              {renderHandle({ bottom: -5, right: -5 }, "bottom-right")}
              {renderHandle(
                { top: "50%", left: -5, transform: "translateY(-50%)" },
                "left"
              )}
              {renderHandle(
                { top: "50%", right: -5, transform: "translateY(-50%)" },
                "right"
              )}
              {renderHandle(
                { top: -5, left: "50%", transform: "translateX(-50%)" },
                "top"
              )}
              {renderHandle(
                { bottom: -5, left: "50%", transform: "translateX(-50%)" },
                "bottom"
              )}
            </>
          ) : (
            <>
              {renderHandle(
                { top: "50%", left: -5, transform: "translateY(-50%)" },
                "startPoint"
              )}
              {renderHandle(
                { top: "50%", right: -5, transform: "translateY(-50%)" },
                "endPoint"
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BorderBox;
