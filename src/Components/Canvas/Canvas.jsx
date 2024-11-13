import React, { useEffect, useState } from "react";
import Shape from "./Shape";
import DetailMenu from "./DetailMenu";

const Canvas = ({
  mode,
  canvasObjects,
  canvasObjectIds,
  setCanvasObjects,
  setCanvasObjectIds,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempObject, setTempObject] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    console.log(canvasObjects, canvasObjectIds);
  }, [canvasObjectIds, canvasObjects]);

  const handleMouseDown = (e) => {
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - canvasRect.left;
    const startY = e.clientY - canvasRect.top;
    console.log("!!");

    setDragStart({ x: startX, y: startY });
    if (!menuPosition) closeDetailMenu();

    switch (mode) {
      case "move":
        setIsDrawing(false);
        return;

      case "rectangle":
      case "circle":
      case "line":
      case "text":
        setIsDrawing(true);
        setTempObject({
          id: canvasObjectIds.length > 0 ? Math.max(...canvasObjectIds) + 1 : 0,
          type: mode,
          position: { x: startX, y: startY },
          size: { width: 0, height: 0 },
          color: "blue",
          text: mode === "text" ? "Enter text" : "",
          isEditing: false,
        });
        break;

      default:
        console.warn(`Unknown mode: ${mode}`);
        break;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - canvasRect.left;
    const currentY = e.clientY - canvasRect.top;

    if (tempObject) {
      const width = Math.abs(currentX - dragStart.x);
      const height = Math.abs(currentY - dragStart.y);
      const positionX = Math.min(currentX, dragStart.x);
      const positionY = Math.min(currentY, dragStart.y);

      setTempObject((prevObject) => ({
        ...prevObject,
        position: { x: positionX, y: positionY },
        size: { width, height },
      }));
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (!tempObject) return;

    setTempObject(null);

    if (tempObject.size.width + tempObject.size.height < 5) return;

    tempObject.isEditing = true;

    setCanvasObjects((prevObjects) => ({
      ...prevObjects,
      [tempObject.id]: tempObject,
    }));
    setCanvasObjectIds((prevIds) => [...prevIds, tempObject.id]);
  };

  const handleUpdateText = (id, newText) => {
    setCanvasObjects((prevObjects) => ({
      ...prevObjects,
      [id]: { ...prevObjects[id], text: newText },
    }));
  };

  const handleDeleteObject = (id) => {
    setCanvasObjects((prevObjects) => {
      const updatedObjects = { ...prevObjects };
      delete updatedObjects[id];
      return updatedObjects;
    });
    setCanvasObjectIds((prevIds) => prevIds.filter((objId) => objId !== id));
  };

  const openDetailMenu = (e, id) => {
    e.preventDefault();
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - canvasRect.left;
    const currentY = e.clientY - canvasRect.top;
    setSelectedId(id);
    setMenuPosition({
      x: currentX,
      y: currentY,
    });
  };

  const closeDetailMenu = () => {
    setMenuPosition(null);
    setSelectedId(null);
  };

  const setCanvasObject = (id, obj) => {
    setCanvasObjects((prevObjects) => ({
      ...prevObjects,
      [id]: obj,
    }));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "600px",
        border: "1px solid black",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {canvasObjectIds.map((id) => (
        <div onContextMenu={(e) => openDetailMenu(e, id)} key={id}>
          <Shape
            {...canvasObjects[id]}
            onUpdateText={(text) => handleUpdateText(id, text)}
            onDelete={() => handleDeleteObject(id)}
          />
        </div>
      ))}

      {isDrawing && tempObject && <Shape {...tempObject} />}

      {menuPosition && selectedId !== null && (
        <div onMouseDown={(e) => e.stopPropagation()}>
          <DetailMenu
            id={selectedId}
            position={menuPosition}
            canvasObject={canvasObjects[selectedId]}
            setCanvasObject={(obj) => setCanvasObject(selectedId, obj)}
            onClose={closeDetailMenu}
            onDelete={() => handleDeleteObject(selectedId)}
          />
        </div>
      )}
    </div>
  );
};

export default Canvas;
