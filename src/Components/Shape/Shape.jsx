import React from "react";
import useCanvas from "../../features/canvas/useCanvas";
import useShapeInteraction from "./useShapeInteraction";
import useShapeStyles from "./useShapeStyles";

const Shape = ({ id }) => {
  const { shapes, updateShape, selectedShapeId, selectShape } = useCanvas();
  const shape = shapes[id];
  const isSelected = selectedShapeId === id;

  if (!shape) return null;

  const { handleMouseDown } = useShapeInteraction(
    shape,
    updateShape,
    selectShape
  );

  const { shapeStyle, handleStyles } = useShapeStyles(shape, isSelected);

  return (
    <div style={shapeStyle} onMouseDown={(e) => handleMouseDown(e, "center")}>
      {shape.type === "text" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            fontSize: shape.size.y / 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          {shape.text}
        </div>
      )}

      {isSelected && shape.type !== "line" && (
        <>
          {/* 꼭짓점 핸들 */}
          <div
            style={handleStyles.topLeft}
            onMouseDown={(e) => handleMouseDown(e, "top-left")}
          />
          <div
            style={handleStyles.topRight}
            onMouseDown={(e) => handleMouseDown(e, "top-right")}
          />
          <div
            style={handleStyles.bottomLeft}
            onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
          />
          <div
            style={handleStyles.bottomRight}
            onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
          />
          {/* 측면 핸들 */}
          <div
            style={handleStyles.left}
            onMouseDown={(e) => handleMouseDown(e, "left")}
          />
          <div
            style={handleStyles.right}
            onMouseDown={(e) => handleMouseDown(e, "right")}
          />
          <div
            style={handleStyles.top}
            onMouseDown={(e) => handleMouseDown(e, "top")}
          />
          <div
            style={handleStyles.bottom}
            onMouseDown={(e) => handleMouseDown(e, "bottom")}
          />
        </>
      )}

      {isSelected && shape.type === "line" && (
        <>
          {/* 선의 시작점 핸들 */}
          <div
            style={handleStyles.startPoint}
            onMouseDown={(e) => handleMouseDown(e, "startPoint")}
          />
          {/* 선의 끝점 핸들 */}
          <div
            style={handleStyles.endPoint}
            onMouseDown={(e) => handleMouseDown(e, "endPoint")}
          />
        </>
      )}
    </div>
  );
};

export default Shape;
