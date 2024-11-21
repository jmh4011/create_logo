import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useCanvas from "../../features/canvas/useCanvas";
const Shape = ({ id }) => {
  const [editing, setEditing] = useState(isEditing);
  const inputRef = useRef(null);
  const { shapes, updateShape, removeShape } = useCanvas();
  const shape = shapes[id];

  const onUpdateText = (text) => {
    updateShape(id, { text });
  };

  const onDelete = () => {
    removeShape(id);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    if (type === "text") setEditing(true);
  };

  const handleBlur = () => {
    if (text.trim() === "" && type === "text") {
      onDelete(); // 텍스트가 없으면 삭제 함수 호출
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작 방지
      handleBlur(); // 포커스 해제
    }
  };

  const commonStyle = {
    position: "absolute",
    left: shape.position.x,
    top: shape.position.y,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    border: `1px solid ${color}`,
  };

  let shapeStyle = {};

  switch (type) {
    case "rectangle":
      shapeStyle = {
        ...commonStyle,
        width: shape.size.width,
        height: shape.size.height,
        backgroundColor: color,
      };
      break;

    case "circle":
      shapeStyle = {
        ...commonStyle,
        width: shape.size.width,
        height: shape.size.width,
        borderRadius: "50%",
        backgroundColor: color,
      };
      break;

    case "line":
      shapeStyle = {
        ...commonStyle,
        width: shape.size.width,
        height: 2,
        backgroundColor: color,
      };
      break;

    case "text":
      shapeStyle = {
        ...commonStyle,
        width: shape.size.width,
        fontSize: shape.size.height / 4,
        whiteSpace: "pre",
        overflow: "visible",
      };
      break;

    default:
      console.warn(`Unknown type: ${type}`);
      break;
  }

  return (
    <div style={shapeStyle} onDoubleClick={handleDoubleClick}>
      {editing ? (
        <TextareaAutosize
          ref={inputRef}
          value={text}
          onChange={(e) => onUpdateText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={1}
          onFocus={(e) => e.currentTarget.select()}
          style={{
            fontSize: shapeStyle.fontSize,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color,
            resize: "none",
            overflow: "visible",
            cursor: "default",
            userSelect: "auto",
          }}
        />
      ) : (
        <div
          style={{
            fontSize: shapeStyle.fontSize,
            color,
            cursor: "default",
            userSelect: "none", // 텍스트 선택 불가
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Shape;
