import React, { useState, useEffect, useRef } from "react";

const TextEditor = ({ shape, updateShape }) => {
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
        insertLineBreak();
      } else {
        // Enter만 누르면 수정 완료
        e.preventDefault();
        finishEditing();
      }
    }
  };

  const insertLineBreak = () => {
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
      selectAllContent(contentRef.current);
    }
  }, [editingText]);

  // 텍스트를 표시할 style
  const textStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    fontSize: shape.size.y / 4,
    color: shape.fontColor || "#000",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    overflow: "visible",
    outline: "none",
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      onDoubleClick={handleDoubleClick}
    >
      {!editingText && (
        <div
          style={{
            ...textStyle,
            pointerEvents: "none",
          }}
        >
          {shape.text}
        </div>
      )}
      {editingText && (
        <div
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onInput={updateEditValueFromContent}
          style={{ ...textStyle, pointerEvents: "auto" }}
        >
          {editValue}
        </div>
      )}
    </div>
  );
};

export default TextEditor;
