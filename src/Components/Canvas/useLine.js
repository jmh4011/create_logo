import { useState, useCallback } from "react";

const useLine = () => {
  // 선을 그리는 함수
  const draw = useCallback((context, obj, isSelected = false) => {
    context.save();
    context.beginPath();
    context.moveTo(
      obj.positionX - obj.width / 2,
      obj.positionY - obj.height / 2
    ); // 시작점
    context.lineTo(
      obj.positionX + obj.width / 2,
      obj.positionY + obj.height / 2
    ); // 끝점
    context.strokeStyle = obj.color;
    context.lineWidth = obj.lineWidth || 2;
    context.stroke();
    if (isSelected) {
      context.strokeStyle = "rgb(255,100,100)"; // 테두리 색상
      context.lineWidth = 4; // 더 두꺼운 테두리
      context.stroke();
    }
    context.restore();
  }, []);

  // 선이 클릭되었는지 확인하는 함수 (사각형의 대각선 내에서 클릭 여부 판단)
  const isClicked = useCallback((obj, x, y) => {
    const distToStart = Math.sqrt(
      Math.pow(x - (obj.positionX - obj.width / 2), 2) +
        Math.pow(y - (obj.positionY - obj.height / 2), 2)
    );
    const distToEnd = Math.sqrt(
      Math.pow(x - (obj.positionX + obj.width / 2), 2) +
        Math.pow(y - (obj.positionY + obj.height / 2), 2)
    );
    const lineLength = Math.sqrt(
      Math.pow(obj.width, 2) + Math.pow(obj.height, 2)
    );

    // 클릭 좌표가 선 가까이 있는지 확인 (선의 두께 5 픽셀 이내)
    return distToStart + distToEnd <= lineLength + 5;
  }, []);

  // 선을 생성하는 함수
  const create = useCallback((id, startX, startY, endX, endY) => {
    const type = "line";
    const width = endX - startX; // 선의 너비
    const height = endY - startY; // 선의 높이
    const positionX = (startX + endX) / 2; // 선의 중심 X 좌표
    const positionY = (startY + endY) / 2; // 선의 중심 Y 좌표
    const newLine = {
      id,
      type,
      positionX,
      positionY,
      width,
      height,
      color: "rgb(0,0,0)",
    };
    return newLine;
  }, []);

  return {
    draw,
    isClicked,
    create,
  };
};

export default useLine;
