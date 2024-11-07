import { useCallback } from "react";

const useTextBoxType2 = () => {
  // 텍스트 박스를 그리는 함수
  const draw = useCallback((context, obj, isSelected = false) => {
    context.save();

    // 사각형을 먼저 그립니다
    context.fillStyle = obj.bgColor || "lightgray"; // 사각형 배경색 설정
    context.fillRect(obj.positionX, obj.positionY, obj.width, obj.height);

    // 텍스트 그리기
    if (obj.text) {
      context.fillStyle = obj.color || "black";
      context.font = `${obj.fontSize}px ${obj.fontStyle}` || "16px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        obj.text,
        obj.positionX + obj.width / 2,
        obj.positionY + obj.height / 2
      );
    }

    // 선택되었거나 드래그 중인 경우 테두리 추가
    if (isSelected) {
      context.strokeStyle = "blue";
      context.lineWidth = 1;
      context.strokeRect(obj.positionX, obj.positionY, obj.width, obj.height);
    }

    context.restore();
  }, []);

  // 텍스트 박스가 클릭되었는지 확인하는 함수
  const isClicked = useCallback((obj, x, y) => {
    return (
      x >= obj.positionX &&
      x <= obj.positionX + obj.width &&
      y >= obj.positionY &&
      y <= obj.positionY + obj.height
    );
  }, []);

  // 텍스트 박스를 생성하는 함수
  const create = useCallback((id, startX, startY, endX, endY) => {
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const positionX = Math.min(startX, endX);
    const positionY = Math.min(startY, endY);
    return {
      id,
      type: "textBoxType2",
      positionX,
      positionY,
      width,
      height,
      text: "", // 초기 텍스트는 빈 문자열
      fontSize: 16, // 글자 크기를 박스 크기에 맞춤
      fontStyle: "Arial",
      color: "black",
      bgColor: "lightgray",
    };
  }, []);

  // 텍스트 추가 함수
  const addText = useCallback((obj, text) => {
    return { ...obj, text };
  }, []);

  return {
    draw,
    isClicked,
    create,
    addText,
  };
};

export default useTextBoxType2;
