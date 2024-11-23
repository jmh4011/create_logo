const useShapeStyles = (shape, isSelected) => {
  const baseStyle = {
    position: "absolute",
    backgroundColor: shape.color || "rgb(0,0,0)",
    border: isSelected ? "2px solid blue" : "1px solid black",
    cursor: "pointer",
    boxSizing: "border-box",
    userSelect: "none",
    display: "flex",
  };

  const commonStyle = {
    left: shape.position.x,
    top: shape.position.y,
    justifyContent: "center",
    alignItems: "center",
  };

  let shapeStyle = {};
  const color = shape.color || "#000";

  switch (shape.type) {
    case "rectangle":
      shapeStyle = {
        ...baseStyle,
        ...commonStyle,
        width: shape.size.width,
        height: shape.size.height,
        backgroundColor: color,
      };
      break;

    case "circle":
      shapeStyle = {
        ...baseStyle,
        ...commonStyle,
        width: shape.size.width,
        height: shape.size.height,
        borderRadius: "50%",
        backgroundColor: color,
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
        ...baseStyle,
        left: `${shape.startPoint.x}px`,
        top: `${shape.startPoint.y}px`,
        width: `${length}px`,
        height: `${shape.thickness}px`,
        transformOrigin: "0 0",
        transform: `rotate(${angle}rad)`,
      };

      break;

    case "text":
      shapeStyle = {
        ...baseStyle,
        ...commonStyle,
        width: shape.size.width,
        fontSize: shape.size.height / 4,
        whiteSpace: "pre",
        overflow: "visible",
      };
      break;

    default:
      console.warn(`Unknown type: ${shape.type}`);
      break;
  }

  const handleSize = 10;
  const halfHandleSize = handleSize / 2;

  const handleStyle = {
    position: "absolute",
    width: `${handleSize}px`,
    height: `${handleSize}px`,
    backgroundColor: "blue",
    zIndex: 2,
  };

  const handleStyles = {
    topLeft: {
      ...handleStyle,
      top: -halfHandleSize,
      left: -halfHandleSize,
      cursor: "nwse-resize",
    },
    topRight: {
      ...handleStyle,
      top: -halfHandleSize,
      right: -halfHandleSize,
      cursor: "nesw-resize",
    },
    bottomLeft: {
      ...handleStyle,
      bottom: -halfHandleSize,
      left: -halfHandleSize,
      cursor: "nesw-resize",
    },
    bottomRight: {
      ...handleStyle,
      bottom: -halfHandleSize,
      right: -halfHandleSize,
      cursor: "nwse-resize",
    },
    left: {
      ...handleStyle,
      top: "50%",
      left: -halfHandleSize,
      transform: "translateY(-50%)",
      cursor: "ew-resize",
    },
    right: {
      ...handleStyle,
      top: "50%",
      right: -halfHandleSize,
      transform: "translateY(-50%)",
      cursor: "ew-resize",
    },
    top: {
      ...handleStyle,
      left: "50%",
      top: -halfHandleSize,
      transform: "translateX(-50%)",
      cursor: "ns-resize",
    },
    bottom: {
      ...handleStyle,
      left: "50%",
      bottom: -halfHandleSize,
      transform: "translateX(-50%)",
      cursor: "ns-resize",
    },
    center: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      cursor: "move",
      backgroundColor: "transparent",
    },
  };

  return {
    shapeStyle,
    handleStyles,
  };
};

export default useShapeStyles;
