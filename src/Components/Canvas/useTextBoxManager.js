import { useState, useRef, useEffect, useCallback } from "react";

const useTextBoxManager = (canvasObjects, setCanvasObjects) => {
  const [selectedTextBoxId, setSelectedTextBoxId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);

  // 글자 너비 계산 함수
  const calculateTextWidth = useCallback((text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  }, []);

  // 텍스트 박스를 클릭하여 편집을 시작할 때 호출
  const startEditing = (id, text, position, fontSize) => {
    setSelectedTextBoxId(id);
    setInputText(text);
    setInputPosition({
      x: position.x,
      y: position.y - fontSize * 0.142, // 포지션 보정
    });
    inputRef.current.focus();
  };

  // 텍스트 업데이트 함수
  const updateText = () => {
    if (selectedTextBoxId) {
      setCanvasObjects((prev) => ({
        ...prev,
        [selectedTextBoxId]: {
          ...prev[selectedTextBoxId],
          text: inputText,
        },
      }));
      setSelectedTextBoxId(null);
      setInputText("");
    }
  };

  return {
    selectedTextBoxId,
    inputText,
    inputPosition,
    inputRef,
    setInputText,
    calculateTextWidth,
    startEditing,
    updateText,
  };
};

export default useTextBoxManager;
