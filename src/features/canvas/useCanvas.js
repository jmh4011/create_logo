// useCanvas.js

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  addShape as addShapeAction,
  updateShape as updateShapeAction,
  removeShape as removeShapeAction,
  setSelectedShapeId as setSelectedShapeIdAction,
} from "./canvasSlice";

/**
 * useCanvas 훅은 캔버스에서 도형을 관리하기 위한 기능을 제공합니다.
 * Redux를 통해 상태를 관리하며, 도형 추가, 업데이트, 삭제, 선택 등의 작업을 수행합니다.
 * 또한, 도형의 종류와 기본 속성을 관리합니다.
 */
const useCanvas = () => {
  const dispatch = useDispatch();

  // Redux 상태에서 필요한 값들을 선택합니다.
  const shapes = useSelector((state) => state.canvas.shapes);
  const shapeIds = useSelector((state) => state.canvas.shapeIds);
  const selectedShapeId = useSelector((state) => state.canvas.selectedShapeId);

  let commonShape = {
    position: { x: 0, y: 0 },
    size: { x: 0, y: 0 },
    color: "rgb(255,255,255)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "rgb(0,0,0)",
  };

  // 도형 타입과 그 기본 속성들
  const shapeTypes = {
    rectangle: {
      ...commonShape,
      type: "rectangle",
    },
    circle: {
      ...commonShape,
      type: "circle",
    },
    line: {
      type: "line",
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 0, y: 0 },
      thickness: 5,
      color: "rgb(0,0,0)",
    },
    text: {
      ...commonShape,
      type: "text",
      text: "Enter text",
      fontSize: 16,
      fontColor: "rgb(0,0,0)",
    },
    icon: {
      ...commonShape,
      type: "icon",
      color: "rgb(0,0,0)",
      backgarundColor: "rgba(255,255,255,0)",
      iconName: null,
    },
  };

  /**
   * 새로운 도형을 추가합니다.
   * @param {Object} shape - 추가할 도형 객체
   */
  const addShape = useCallback(
    (shape) => {
      dispatch(addShapeAction(shape));
    },
    [dispatch]
  );

  /**
   * 특정 도형 타입의 기본 속성을 반환합니다.
   * @param {string} shapeType - 도형 타입
   * @returns {Object|null} 기본 속성 객체 또는 null
   */
  const getDefaultShapeProperties = (shapeType) => {
    return shapeTypes[shapeType] || null;
  };

  /**
   * 새로운 도형을 생성합니다.
   * @param {string} shapeType - 생성할 도형의 타입 (rectangle, circle, line, text, icon)
   * @param {Object} startPoint - 생성한 도형의 위치 (x: number, y: number)
   * @param {Object} customProperties - 커스텀 속성 (선택 사항)
   * @returns {Object|null} 생성된 도형 객체 또는 null
   */
  const createShape = useCallback(
    (shapeType, startPoint, customProperties = {}) => {
      const shapeId = shapeIds.length > 0 ? Math.max(...shapeIds) + 1 : 0;
      const defaultProperties = getDefaultShapeProperties(shapeType);

      if (!defaultProperties) {
        console.warn(`Unknown shape type: ${shapeType}`);
        return null;
      }

      const newShape = {
        id: shapeId,
        ...defaultProperties,
        ...customProperties,
      };

      if (shapeType === "line") {
        newShape.startPoint = startPoint;
        newShape.endPoint = startPoint;
      } else {
        newShape.position = startPoint;
      }

      dispatch(addShapeAction(newShape));

      return newShape;
    },
    [dispatch, shapeIds]
  );

  /**
   * 기존 도형을 업데이트합니다.
   * @param {number} id - 업데이트할 도형의 ID
   * @param {Object} properties - 업데이트할 속성들
   */
  const updateShape = useCallback(
    (id, properties) => {
      // 위치와 크기 속성을 정수로 변환하여 정규화합니다.
      const normalizedProperties = { ...properties };

      if (normalizedProperties.position) {
        normalizedProperties.position = {
          x: Math.round(normalizedProperties.position.x),
          y: Math.round(normalizedProperties.position.y),
        };
      }

      if (normalizedProperties.size) {
        normalizedProperties.size = {
          x: Math.round(normalizedProperties.size.x),
          y: Math.round(normalizedProperties.size.y),
        };
      }

      if (normalizedProperties.startPoint) {
        normalizedProperties.startPoint = {
          x: Math.round(normalizedProperties.startPoint.x),
          y: Math.round(normalizedProperties.startPoint.y),
        };
      }

      if (normalizedProperties.endPoint) {
        normalizedProperties.endPoint = {
          x: Math.round(normalizedProperties.endPoint.x),
          y: Math.round(normalizedProperties.endPoint.y),
        };
      }

      if (normalizedProperties.thickness) {
        normalizedProperties.thickness = Math.round(
          normalizedProperties.thickness
        );
      }

      dispatch(updateShapeAction({ id, properties: normalizedProperties }));
    },
    [dispatch]
  );

  /**
   * 특정 도형을 삭제합니다.
   * @param {number} id - 삭제할 도형의 ID
   */
  const removeShape = useCallback(
    (id) => {
      dispatch(removeShapeAction(id));
    },
    [dispatch]
  );

  /**
   * 도형을 선택합니다.
   * @param {number} id - 선택할 도형의 ID
   */
  const selectShape = useCallback(
    (id) => {
      dispatch(setSelectedShapeIdAction(id));
    },
    [dispatch]
  );

  /**
   * 현재 선택된 도형을 해제합니다.
   */
  const deselectShape = useCallback(() => {
    dispatch(setSelectedShapeIdAction(null));
  }, [dispatch]);

  return {
    shapes, // 도형 객체 목록
    shapeIds, // 도형 ID 목록
    selectedShapeId, // 현재 선택된 도형의 ID
    addShape, // 도형 추가 함수
    updateShape, // 도형 업데이트 함수
    removeShape, // 도형 삭제 함수
    selectShape, // 도형 선택 함수
    deselectShape, // 도형 선택 해제 함수
    createShape, // 새로운 도형 생성 함수
    getDefaultShapeProperties, // 도형 타입의 기본 속성 반환 함수
    shapeTypes, // 도형 타입 및 기본 속성 정보
  };
};

export default useCanvas;
