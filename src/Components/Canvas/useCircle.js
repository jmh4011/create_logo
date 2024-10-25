import { useState, useCallback } from "react";

const useCircle = () => {
  // 원을 그리는 함수
  const draw = useCallback((context, obj, isSelected = false) => {
    context.save();
    context.beginPath();
    context.arc(obj.positionX, obj.positionY, obj.radius, 0, 2 * Math.PI);
    context.fillStyle = obj.color;
    context.fill();
    if (isSelected) {
      context.strokeStyle = "rgb(255,100,100)";
      context.lineWidth = 2;
      context.stroke();
    }
    context.restore();
  }, []);

  // 원이 클릭되었는지 확인하는 함수 (중심에서 클릭된 좌표까지의 거리를 이용)
  const isClicked = useCallback((obj, x, y) => {
    const distX = obj.positionX - x;
    const distY = obj.positionY - y;
    return Math.pow(obj.radius, 2) >= Math.pow(distX, 2) + Math.pow(distY, 2);
  }, []);

  // 원을 생성하는 함수
  const create = useCallback((id, startX, startY, endX, endY) => {
    const type = "circle";
    const radius =
      Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / 2;
    const positionX = (startX + endX) / 2;
    const positionY = (startY + endY) / 2;
    const newCircle = {
      id,
      type,
      positionX,
      positionY,
      radius,
      color: "rgb(0,0,0)",
    };
    return newCircle;
  }, []);

  return {
    draw,
    isClicked,
    create,
  };
};

export default useCircle;
