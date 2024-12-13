import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  addShape as addShapeAction,
  updateShape as updateShapeAction,
  removeShape as removeShapeAction,
  setSelectedShapeId as setSelectedShapeIdAction,
} from "./canvasSlice";

const useCanvas = () => {
  const dispatch = useDispatch();

  const shapes = useSelector((state) => state.canvas.shapes);
  const shapeIds = useSelector((state) => state.canvas.shapeIds);
  const selectedShapeId = useSelector((state) => state.canvas.selectedShapeId);

  let commonShape = {
    position: { x: 0, y: 0 },
    size: { x: 0, y: 0 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    border: { width: 2, style: "solid", color: { r: 0, g: 0, b: 0, a: 1 } },
  };

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
      color: { r: 0, g: 0, b: 0, a: 1 },
    },
    text: {
      ...commonShape,
      type: "text",
      text: "Enter text",
      fontSize: 16,
      fontColor: { r: 0, g: 0, b: 0, a: 1 },
    },
    icon: {
      ...commonShape,
      type: "icon",
      color: { r: 0, g: 0, b: 0, a: 1 },
      backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
      iconName: null,
    },
  };

  const addShape = useCallback(
    (shape) => {
      dispatch(addShapeAction(shape));
    },
    [dispatch]
  );

  const getDefaultShapeProperties = (shapeType) => {
    return shapeTypes[shapeType] || null;
  };

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
        name: `shape ${shapeId}`,
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

  const updateShape = useCallback(
    (id, properties) => {
      const normalizedProperties = { ...properties };

      if (normalizedProperties.position && normalizedProperties.size) {
        normalizedProperties.position = {
          x: Math.max(
            Math.min(
              normalizedProperties.position.x,
              100 - normalizedProperties.size.x
            ),
            0
          ),
          y: Math.max(
            Math.min(
              normalizedProperties.position.y,
              100 - normalizedProperties.size.y
            ),
            0
          ),
        };
      }

      if (normalizedProperties.startPoint) {
        normalizedProperties.startPoint = {
          x: Math.max(Math.min(normalizedProperties.startPoint.x, 100), 0),
          y: Math.max(Math.min(normalizedProperties.startPoint.y, 100), 0),
        };
      }

      if (normalizedProperties.endPoint) {
        normalizedProperties.endPoint = {
          x: Math.max(Math.min(normalizedProperties.endPoint.x, 100), 0),
          y: Math.max(Math.min(normalizedProperties.endPoint.y, 100), 0),
        };
      }

      dispatch(updateShapeAction({ id, properties: normalizedProperties }));
    },
    [dispatch]
  );

  const removeShape = useCallback(
    (id) => {
      dispatch(removeShapeAction(id));
    },
    [dispatch]
  );

  const selectShape = useCallback(
    (id) => {
      dispatch(setSelectedShapeIdAction(id));
    },
    [dispatch]
  );

  const deselectShape = useCallback(() => {
    dispatch(setSelectedShapeIdAction(null));
  }, [dispatch]);

  return {
    shapes,
    shapeIds,
    selectedShapeId,
    addShape,
    updateShape,
    removeShape,
    selectShape,
    deselectShape,
    createShape,
    getDefaultShapeProperties,
    shapeTypes,
  };
};

export default useCanvas;
