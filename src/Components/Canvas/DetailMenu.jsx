import React, { useState, useCallback, memo, useEffect, useRef } from "react";
import useCanvas from "../../features/canvas/useCanvas";
import { RgbaStringColorPicker } from "react-colorful";

const DetailMenu = ({ id, position }) => {
  const { shapes, updateShape, removeShape } = useCanvas();
  const [showSubMenu, setShowSubMenu] = useState(null);
  const [sidePosition, setSidePosition] = useState(null);
  const [focusInput, setFocusInput] = useState();
  const [cursorPosition, setCursorPosition] = useState(null);

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

  const InputField = memo(
    ({ inputKey, label, value, onChange }) => {
      const inputRef = useRef();

      const handleChange = (e) => {
        if (!/^-?\d*$/.test(e.target.value)) return;
        setFocusInput(inputKey);
        const cursorPos = e.target.selectionStart;
        setCursorPosition(cursorPos);
        onChange(+e.target.value);
      };

      useEffect(() => {
        if (
          document.activeElement !== inputRef.current &&
          inputKey === focusInput
        ) {
          inputRef.current.focus();

          // 이전에 저장한 커서 위치를 복원
          if (cursorPosition !== null) {
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
          }
        }
      }, [value, focusInput, cursorPosition]);

      return (
        <div>
          {label}:
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            style={{ marginLeft: "4px" }}
          />
        </div>
      );
    },
    (prevProps, nextProps) => prevProps.value === nextProps.value
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
            inputKey={1}
            label="X"
            value={shape.position.x}
            onChange={(x) =>
              setShape({
                position: { x, y: shape.position.y },
              })
            }
          />
          <InputField
            inputKey={2}
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
            inputKey={3}
            label="X"
            value={shape.size.x}
            onChange={(x) =>
              setShape({
                size: { x, y: shape.size.y },
              })
            }
          />
          <InputField
            inputKey={4}
            label="Y"
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
