const useShapeStyles = (shape, isSelected) => {
  const baseStyle = {
    position: "absolute",
    left: shape.position.x,
    top: shape.position.y,
    width: shape.size.width,
    height: shape.size.height,
    backgroundColor: shape.color,
    border: isSelected ? "2px solid blue" : "1px solid black",
    cursor: isSelected ? "move" : "default",
    boxSizing: "border-box",
  };

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
    baseStyle,
    handleStyles,
  };
};

export default useShapeStyles;
