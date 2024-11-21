import React from "react";
import useCanvas from "../../features/canvas/useCanvas";
import useShapeInteraction from "./useShapeInteraction";
import useShapeStyles from "./useShapeStyles";

const Shape = ({ id }) => {
  const { shapes, updateShape, selectedShapeId, selectShape } = useCanvas();
  const shape = shapes[id];
  const isSelected = selectedShapeId === id;

  const { handleMouseDown, handleMouseMove, handleMouseUp } =
    useShapeInteraction(shape, updateShape, selectShape);

  const { baseStyle, getHandleStyles } = useShapeStyles(shape, isSelected);

  if (!shape) return null;

  const handleStyles = getHandleStyles();

  return (
    <div
      style={baseStyle}
      onMouseDown={(e) => handleMouseDown(e, "center")}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 상단 */}
      <div
        style={handleStyles.top}
        onMouseDown={(e) => handleMouseDown(e, "top")}
      />
      {/* 하단 */}
      <div
        style={handleStyles.bottom}
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
      />
      {/* 좌측 */}
      <div
        style={handleStyles.left}
        onMouseDown={(e) => handleMouseDown(e, "left")}
      />
      {/* 우측 */}
      <div
        style={handleStyles.right}
        onMouseDown={(e) => handleMouseDown(e, "right")}
      />
    </div>
  );
};

export default Shape;
