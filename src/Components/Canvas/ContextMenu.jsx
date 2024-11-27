import React, { useState, useCallback } from "react";
import useCanvas from "../../features/canvas/useCanvas";

const ContextMenu = ({ id, position, onClose }) => {
  const { shapes, updateShape, removeShape } = useCanvas();

  const shape = shapes[id];

  const setShape = useCallback(
    (properties) => {
      updateShape(id, properties);
    },
    [id, updateShape]
  );

  const deleteShape = useCallback(() => {
    onClose();
    removeShape(id);
  }, [id, removeShape]);

  const MenuItem = ({ label, menuId, onClick }) => (
    <div
      style={{
        backgroundColor: "rgb(255,255,255)",
        border: "1px solid gray",
        padding: "8px",
        marginTop: "4px",
        cursor: menuId ? "pointer" : "default",
        color: menuId === "delete" ? "red" : "inherit",
      }}
      onClick={onClick}
    >
      {label}
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: "8px",
        zIndex: 10,
      }}
    >
      <MenuItem label={`Object ID: ${id}`} />
      <MenuItem label="Delete" menuId="delete" onClick={deleteShape} />
    </div>
  );
};

export default ContextMenu;
