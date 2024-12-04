import React from "react";
import useCanvas from "../../features/canvas/useCanvas";
import iconMapping from "../../utils/iconMapping";
import BorderBox from "./BorderBox";

const Shape = ({ id }) => {
  const { shapes, updateShape, selectedShapeId, selectShape } = useCanvas();
  const shape = shapes[id];
  const isSelected = selectedShapeId === id;

  if (!shape) return null;

  const IconComponent =
    shape.type === "icon" && shape.iconName
      ? iconMapping[shape.iconName]
      : null;

  let shapeStyle = {
    position: "absolute",
    cursor: "pointer",
    boxSizing: "border-box",
    userSelect: "none",
    display: "flex",
    backgroundColor: shape.color || "rgb(0,0,0)",
  };
  let commonStyle = {
    border: "2px solid blue",
    left: shape.position?.x || 0,
    top: shape.position?.y || 0,

    width: shape.size?.x || 0,
    height: shape.size?.y || 0,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: shape.borderWidth,
    borderStyle: shape.borderStyle,
    borderColor: shape.borderColor,
  };

  switch (shape.type) {
    case "rectangle":
      shapeStyle = {
        ...shapeStyle,
        ...commonStyle,
      };
      break;

    case "circle":
      shapeStyle = {
        ...shapeStyle,
        ...commonStyle,
        borderRadius: "50%",
      };
      break;

    case "text":
      shapeStyle = {
        ...shapeStyle,
        ...commonStyle,
        fontSize: shape.size?.y ? shape.size.y / 4 : 16,
        whiteSpace: "pre",
        overflow: "visible",
      };
      break;
    case "line":
      const length = Math.sqrt(
        Math.pow(shape.endPoint.x - shape.startPoint.x, 2) +
          Math.pow(shape.endPoint.y - shape.startPoint.y, 2)
      );
      const angle = Math.atan2(
        shape.endPoint.y - shape.startPoint.y,
        shape.endPoint.x - shape.startPoint.x
      );
      shapeStyle = {
        ...shapeStyle,
        left: `${shape.startPoint.x}px`,
        top: `${shape.startPoint.y}px`,
        width: `${length}px`,
        height: `${shape.thickness || 2}px`,
        transformOrigin: "0 0",
        transform: `rotate(${angle}rad)`,
      };
      break;

    case "icon":
      shapeStyle = {
        ...shapeStyle,
        ...commonStyle,
        backgroundColor: shape.backgroundColor,
      };
      break;
    default:
      console.warn(`Unknown type: ${shape.type}`);
      break;
  }

  return (
    <div style={shapeStyle}>
      {IconComponent && (
        <IconComponent
          style={{
            position: "absolute",
            color: shape.color,
            width: "100%",
            height: "100%",
          }}
        />
      )}
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
            position: "absolute",
          }}
        >
          {shape.text}
        </div>
      )}
      <BorderBox
        shape={shape}
        isSelected={isSelected}
        updateShape={updateShape}
        selectShape={selectShape}
      />
    </div>
  );
};

export default Shape;
