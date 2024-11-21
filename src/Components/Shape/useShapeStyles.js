const useShapeStyles = (shape, isSelected) => {
  const baseStyle = {
    position: "absolute",
    left: shape.position.x,
    top: shape.position.y,
    width: shape.size.width,
    height: shape.size.height,
    backgroundColor: shape.color,
    border: isSelected ? "2px solid blue" : "1px solid black",
    cursor: "move",
  };

  const handleStyle = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "blue",
    zIndex: 2,
  };

  const getHandleStyles = () => ({
    top: {
      ...handleStyle,
      top: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      cursor: "n-resize",
    },
    bottom: {
      ...handleStyle,
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      cursor: "s-resize",
    },
    left: {
      ...handleStyle,
      top: "50%",
      left: "-5px",
      transform: "translateY(-50%)",
      cursor: "w-resize",
    },
    right: {
      ...handleStyle,
      top: "50%",
      right: "-5px",
      transform: "translateY(-50%)",
      cursor: "e-resize",
    },
  });

  return {
    baseStyle,
    getHandleStyles,
  };
};

export default useShapeStyles;
