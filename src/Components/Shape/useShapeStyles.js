const useShapeStyles = (shape, isSelected) => {
  let shapeStyle = {
    position: "absolute",
    backgroundColor: shape.color || "rgb(0,0,0)",
    border: "2px solid blue",
    cursor: "pointer",
    boxSizing: "border-box",
    userSelect: "none",
    display: "flex",
  };
  let borderBox = {
    position: "absolute",
    borderWidth: "1px", // 테두리 두께
    borderStyle: "solid", // 테두리 스타일
    borderImage: `
      repeating-linear-gradient(
        45deg, 
        black, black 5px, white 5px, white 10px
      ) 10 stretch
    `,
    borderImageSlice: 1,
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 5,
  };
  const color = shape.color || "#000";

  const handleSize = 10;
  const halfHandleSize = handleSize / 2;

  const handleStyle = {
    position: "absolute",
    width: `${handleSize}px`,
    height: `${handleSize}px`,
    backgroundColor: "blue",
    zIndex: 2,
  };

  const handleStyles = {};

  if (shape.type === "line") {
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
      backgroundColor: color,
    };

    // 시작점 핸들 스타일
    handleStyles.startPoint = {
      ...handleStyle,
      left: `${-halfHandleSize}px`,
      top: `${-halfHandleSize + (shape.thickness || 2) / 2}px`,
      cursor: "pointer",
    };

    // 끝점 핸들 스타일
    handleStyles.endPoint = {
      ...handleStyle,
      left: `${length - halfHandleSize}px`,
      top: `${-halfHandleSize + (shape.thickness || 2) / 2}px`,
      cursor: "pointer",
    };

    borderBox = {
      ...borderBox,
      left: `${shape.startPoint.x}px`,
      top: `${shape.startPoint.y}px`,
      width: `${length}px`,
      height: `${shape.thickness || 2}px`,
      transformOrigin: "0 0",
      transform: `rotate(${angle}rad)`,
    };
  } else {
    const commonStyle = {
      left: shape.position?.x || 0,
      top: shape.position?.y || 0,
      justifyContent: "center",
      alignItems: "center",
    };

    switch (shape.type) {
      case "icon":
      case "rectangle":
        shapeStyle = {
          ...shapeStyle,
          ...commonStyle,
          width: shape.size?.x || 0,
          height: shape.size?.y || 0,
          backgroundColor: color,
        };
        break;

      case "circle":
        shapeStyle = {
          ...shapeStyle,
          ...commonStyle,
          width: shape.size?.x || 0,
          height: shape.size?.y || 0,
          borderRadius: "50%",
          backgroundColor: color,
        };
        break;

      case "text":
        shapeStyle = {
          ...shapeStyle,
          ...commonStyle,
          width: shape.size?.x || 0,
          fontSize: shape.size?.y ? shape.size.y / 4 : 16,
          whiteSpace: "pre",
          overflow: "visible",
        };
        break;

      default:
        console.warn(`Unknown type: ${shape.type}`);
        break;
    }

    handleStyles.topLeft = {
      ...handleStyle,
      top: -halfHandleSize,
      left: -halfHandleSize,
      cursor: "nwse-resize",
    };
    handleStyles.topRight = {
      ...handleStyle,
      top: -halfHandleSize,
      right: -halfHandleSize,
      cursor: "nesw-resize",
    };
    handleStyles.bottomLeft = {
      ...handleStyle,
      bottom: -halfHandleSize,
      left: -halfHandleSize,
      cursor: "nesw-resize",
    };
    handleStyles.bottomRight = {
      ...handleStyle,
      bottom: -halfHandleSize,
      right: -halfHandleSize,
      cursor: "nwse-resize",
    };
    handleStyles.left = {
      ...handleStyle,
      top: "50%",
      left: -halfHandleSize,
      transform: "translateY(-50%)",
      cursor: "ew-resize",
    };
    handleStyles.right = {
      ...handleStyle,
      top: "50%",
      right: -halfHandleSize,
      transform: "translateY(-50%)",
      cursor: "ew-resize",
    };
    handleStyles.top = {
      ...handleStyle,
      left: "50%",
      top: -halfHandleSize,
      transform: "translateX(-50%)",
      cursor: "ns-resize",
    };
    handleStyles.bottom = {
      ...handleStyle,
      left: "50%",
      bottom: -halfHandleSize,
      transform: "translateX(-50%)",
      cursor: "ns-resize",
    };
    handleStyles.center = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      cursor: "move",
      backgroundColor: "transparent",
    };

    borderBox = {
      left: shape.position?.x || 0,
      top: shape.position?.y || 0,
      width: shape.size?.x || 0,
      height: shape.size?.y || 0,
      borderWidth: "1px", // 테두리 두께
      borderStyle: "solid", // 테두리 스타일
      borderImage: `
        repeating-linear-gradient(
          45deg, 
          black, black 5px, white 5px, white 10px
        ) 10 stretch
      `,
      borderImageSlice: 1,
      backgroundColor: "rgba(0,0,0,0)",
    };
  }
  return {
    shapeStyle,
    handleStyles,
    borderBox,
  };
};

export default useShapeStyles;
