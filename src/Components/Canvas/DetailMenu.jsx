import React, { useState, useCallback } from "react";
import useCanvas from "../../features/canvas/useCanvas";
import { RgbaStringColorPicker } from "react-colorful";

const DetailMenu = ({ id, position }) => {
  const { shapes, updateShape, removeShape } = useCanvas();
  const [showSubMenu, setShowSubMenu] = useState(null);
  const [sidePosition, setSidePosition] = useState(null);

  const shape = shapes[id];

  const setShape = useCallback(
    (properties) => {
      updateShape(id, properties);
    },
    [id, updateShape]
  );

  const deleteShape = useCallback(() => {
    removeShape(id);
  }, [id, removeShape]);

  const handleMouseEnter = (e, menuId) => {
    const rect = e.target.getBoundingClientRect();
    setShowSubMenu(menuId);
    setSidePosition({ x: rect.right, y: rect.top });
  };

  const SubMenu = ({ children }) =>
    showSubMenu && (
      <div
        style={{
          position: "fixed",
          left: sidePosition?.x,
          top: sidePosition?.y,
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid gray",
          padding: "8px",
        }}
      >
        {children}
      </div>
    );

  const InputField = ({ label, value, onChange }) => (
    <div>
      {label}:
      <input
        type="number"
        defaultValue={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{ marginLeft: "4px" }}
      />
    </div>
  );

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
      onMouseEnter={menuId && ((e) => handleMouseEnter(e, menuId))}
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

      <MenuItem label="Position" menuId="position" />
      <MenuItem label="Size" menuId="size" />
      <MenuItem label="Color" menuId="color" />
      <MenuItem label="Delete" menuId="delete" onClick={deleteShape} />

      {showSubMenu === "position" && (
        <SubMenu>
          <InputField
            label="X"
            value={shape.position.x}
            onChange={(x) =>
              setShape({
                position: { x, y: shape.position.y },
              })
            }
          />
          <InputField
            label="Y"
            value={shape.position.y}
            onChange={(y) =>
              setShape({
                position: { x: shape.position.x, y },
              })
            }
          />
        </SubMenu>
      )}

      {showSubMenu === "size" && (
        <SubMenu>
          <InputField
            label="Width"
            value={shape.size.x}
            onChange={(x) =>
              setShape({
                size: { x, y: shape.size.y },
              })
            }
          />
          <InputField
            label="Height"
            value={shape.size.y}
            onChange={(y) =>
              setShape({
                size: { x: shape.size.x, y },
              })
            }
          />
        </SubMenu>
      )}

      {showSubMenu === "color" && (
        <SubMenu>
          <RgbaStringColorPicker
            color={shape.color}
            onChange={(value) => setShape({ color: value })}
          />
        </SubMenu>
      )}
    </div>
  );
};

export default DetailMenu;
