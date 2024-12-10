import React, { useState, useRef, useEffect } from "react";
import useCanvas from "../../features/canvas/useCanvas";
import iconMapping from "../../utils/iconMapping";
import BorderBox from "./BorderBox";
import colorToString from "../../utils/colorToString";

const Shape = ({ canvasRef, id }) => {
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
    pointerEvents: "auto", // 도형 자체는 클릭 가능
    backgroundColor: colorToString(shape.color) || "rgb(0,0,0)",
  };
  let commonStyle = {
    left: `${shape.position?.x}%` || 0,
    top: `${shape.position?.y}%` || 0,
    width: `${shape.size?.x}%` || 0,
    height: `${shape.size?.y}%` || 0,
    borderWidth: shape.border?.width,
    borderStyle: shape.border?.style,
    borderColor: colorToString(shape.border?.color),
  };

  switch (shape.type) {
    case "rectangle":
      shapeStyle = { ...shapeStyle, ...commonStyle };
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
        whiteSpace: "pre-wrap",
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
        left: `${shape.startPoint.x}%`,
        top: `${shape.startPoint.y}%`,
        width: `${length}%`,
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

  // 텍스트 편집 로직
  const [editingText, setEditingText] = useState(false);
  const [editValue, setEditValue] = useState(shape.text || "");
  const contentRef = useRef(null);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (shape.type === "text") {
      setEditingText(true);
      setEditValue(shape.text || "");
    }
  };

  const finishEditing = () => {
    setEditingText(false);
    updateShape(shape.id, { text: editValue });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift+Enter 줄바꿈
        e.preventDefault();
        // 커서 위치에 줄바꿈 삽입
        insertLineBreak(e.target);
      } else {
        // Enter만 누르면 수정 완료
        e.preventDefault();
        finishEditing();
      }
    }
  };

  const insertLineBreak = (element) => {
    // 현재 커서 위치에 줄바꿈 삽입
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const br = document.createElement("br");
    range.insertNode(br);
    range.setStartAfter(br);
    range.setEndAfter(br);
    selection.removeAllRanges();
    selection.addRange(range);
    updateEditValueFromContent();
  };

  const updateEditValueFromContent = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText;
      setEditValue(text);
    }
  };

  const handleBlur = () => {
    finishEditing();
  };

  const handleFocus = () => {
    // 포커스 시 전체 텍스트 선택
    selectAllContent(contentRef.current);
  };

  const selectAllContent = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  useEffect(() => {
    if (editingText && contentRef.current) {
      contentRef.current.focus();
      // 포커스 시 전체 텍스트 선택
      selectAllContent(contentRef.current);
    }
  }, [editingText]);

  return (
    <div style={shapeStyle} onDoubleClick={handleDoubleClick}>
      {IconComponent && (
        <IconComponent
          style={{
            position: "absolute",
            color: colorToString(shape.color),
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {shape.type === "text" && !editingText && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            fontSize: shape.size.y / 4,
            display: "flex",
            userSelect: "none",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            backgroundColor: "rgba(0,0,0,0)",
            wordWrap: "break-word",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {shape.text}
        </div>
      )}

      {editingText && shape.type === "text" && (
        <div
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            fontSize: shape.size.y / 4,
            color: shape.fontColor || "#000",
            backgroundColor: "rgba(0,0,0,0)",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            overflow: "visible",
            outline: "none",
          }}
          onInput={updateEditValueFromContent}
        >
          {editValue}
        </div>
      )}

      <BorderBox
        canvasRef={canvasRef}
        shape={shape}
        isSelected={isSelected}
        updateShape={updateShape}
        selectShape={selectShape}
      />
    </div>
  );
};

export default Shape;
