import { useCallback } from "react";

const useTextBoxType1 = () => {
  // 텍스트 박스를 그리는 함수
  const draw = useCallback((context, obj, isSelected = false) => {
    context.save();
    context.fillStyle = obj.color || "black";
    context.font = `${obj.fontSize}px ${obj.fontStyle}` || "16px Arial";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText(obj.text, obj.positionX, obj.positionY);

    // 선택되었거나 드래그 중인 경우 테두리 추가
    if (isSelected) {
      const textWidth = context.measureText(obj.text).width;
      const textHeight = obj.fontSize; // 폰트 크기에 맞춰 높이를 설정합니다.
      context.strokeStyle = "blue";
      context.lineWidth = 1;
      context.strokeRect(obj.positionX, obj.positionY, textWidth, textHeight);
    }

    context.restore();
  }, []);

  // 텍스트 박스가 클릭되었는지 확인하는 함수
  const isClicked = useCallback((obj, x, y) => {
    const context = document.createElement("canvas").getContext("2d");
    context.font = `${obj.fontSize}px ${obj.fontStyle}` || "16px Arial";
    const textWidth = context.measureText(obj.text).width;
    const textHeight = obj.fontSize;
    return (
      x >= obj.positionX &&
      x <= obj.positionX + textWidth &&
      y >= obj.positionY &&
      y <= obj.positionY + textHeight
    );
  }, []);

  // 텍스트 박스를 생성하는 함수
  const create = useCallback((id, startX, startY, endX, endY) => {
    const width = Math.abs(endX - startX) / 4;
    const height = Math.abs(endY - startY);
    const positionX = Math.min(startX, endX);
    const positionY = Math.min(startY, endY);
    return {
      id,
      type: "textBoxType1",
      positionX,
      positionY,
      text: "TEXT",
      fontSize: height,
      fontStyle: "Arial",
      color: "black",
    };
  }, []);

  return {
    draw,
    isClicked,
    create,
  };
};

export default useTextBoxType1;
