import { useState, useCallback } from "react";

const useRectangle = () => {
  // 사각형을 그리는 함수
  const draw = useCallback((context, obj, isSelected = false) => {
    context.save();
    context.translate(obj.positionX, obj.positionY);
    context.fillStyle = obj.color;
    context.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);

    if (isSelected) {
      context.strokeStyle = "rgb(255,100,100)"; // 테두리 색상
      context.lineWidth = 2; // 테두리 두께
      context.strokeRect(
        -obj.width / 2,
        -obj.height / 2,
        obj.width,
        obj.height
      );
    }
    context.restore();
  }, []);

  // 사각형이 클릭되었는지 확인하는 함수
  const isClicked = useCallback((obj, x, y) => {
    return (
      x >= obj.positionX - obj.width / 2 &&
      x <= obj.positionX + obj.width / 2 &&
      y >= obj.positionY - obj.height / 2 &&
      y <= obj.positionY + obj.height / 2
    );
  }, []);

  // 사각형을 생성하는 함수
  const create = useCallback((id, startX, startY, endX, endY) => {
    const type = "rectangle";
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const positionX = (startX + endX) / 2;
    const positionY = (startY + endY) / 2;
    const newRectangle = {
      id,
      type,
      positionX,
      positionY,
      width,
      height,
      color: "rgb(0,0,0)",
    };
    return newRectangle;
  }, []);

  return {
    draw,
    isClicked,
    create,
  };
};

export default useRectangle;
