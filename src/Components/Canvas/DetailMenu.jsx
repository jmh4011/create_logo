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

  const handleMouseEnter = useCallback((e, menuId) => {
    const rect = e.target.getBoundingClientRect();
    setShowSubMenu(menuId);
    setSidePosition({ x: rect.right, y: rect.top });
  }, []);

  // 스타일 객체를 컴포넌트 외부에서 정의하여 재사용
  const subMenuStyle = {
    position: "fixed",
    backgroundColor: "rgb(255,255,255)",
    border: "1px solid gray",
    padding: "8px",
  };

  const SubMenu = memo(
    ({ children }) =>
      showSubMenu && (
        <div
          style={{
            ...subMenuStyle,
            left: sidePosition?.x,
            top: sidePosition?.y,
          }}
        >
          {children}
        </div>
      )
  );

  const InputField = memo(
    ({ inputKey, label, value, onChange }) => {
      const inputRef = useRef();

      const handleChange = useCallback(
        (e) => {
          if (!/^-?\d*$/.test(e.target.value)) return;
          setFocusInput(inputKey);
          const cursorPos = e.target.selectionStart;
          setCursorPosition(cursorPos);
          onChange(+e.target.value);
        },
        [inputKey, onChange]
      );

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
      }, [value, focusInput, cursorPosition, inputKey]);

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
    (prevProps, nextProps) =>
      prevProps.value === nextProps.value &&
      prevProps.onChange === nextProps.onChange
  );

  const ColorField = memo(
    ({ color, onChange }) => {
      return <RgbaStringColorPicker color={color} onChange={onChange} />;
    },
    (prevProps, nextProps) =>
      prevProps.color === nextProps.color &&
      prevProps.onChange === nextProps.onChange
  );

  // onChange 핸들러를 useCallback으로 메모이제이션
  const handleColorChange = useCallback(
    (value) => setShape({ color: value }),
    [setShape]
  );

  const D2Input = memo(({ value, onChange }) => {
    const handleXChange = useCallback(
      (x) => onChange({ x, y: value.y }),
      [onChange, value.y]
    );

    const handleYChange = useCallback(
      (y) => onChange({ x: value.x, y }),
      [onChange, value.x]
    );

    return (
      <>
        <InputField
          inputKey={1}
          label="X"
          value={value.x}
          onChange={handleXChange}
        />
        <InputField
          inputKey={2}
          label="Y"
          value={value.y}
          onChange={handleYChange}
        />
      </>
    );
  });

  const MenuItem = memo(
    ({ label, menuId, onClick }) => (
      <div
        style={{
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid gray",
          padding: "8px",
          marginTop: "4px",
          cursor: menuId ? "pointer" : "default",
          color: menuId === "delete" ? "red" : "inherit",
        }}
        onMouseEnter={menuId ? (e) => handleMouseEnter(e, menuId) : undefined}
        onClick={onClick}
      >
        {label}
      </div>
    ),
    (prevProps, nextProps) =>
      prevProps.label === nextProps.label &&
      prevProps.menuId === nextProps.menuId &&
      prevProps.onClick === nextProps.onClick
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
      {shape.type !== "line" ? (
        <>
          <MenuItem label="Position" menuId="position" />
          <MenuItem label="Size" menuId="size" />
        </>
      ) : (
        <>
          <MenuItem label="StartPoint" menuId="startPoint" />
          <MenuItem label="EndPoint" menuId="endPoint" />
          <MenuItem label="Thickness" menuId="thickness" />
        </>
      )}
      <MenuItem label="Color" menuId="color" />
      <MenuItem label="Delete" menuId="delete" onClick={deleteShape} />

      {showSubMenu === "position" && (
        <SubMenu>
          <D2Input
            value={shape.position}
            onChange={(val) => {
              setShape({ position: val });
            }}
          />
        </SubMenu>
      )}

      {showSubMenu === "size" && (
        <SubMenu>
          <D2Input
            value={shape.size}
            onChange={(val) => {
              setShape({ size: val });
            }}
          />
        </SubMenu>
      )}

      {showSubMenu === "color" && (
        <SubMenu>
          <ColorField color={shape.color} onChange={handleColorChange} />
        </SubMenu>
      )}

      {showSubMenu === "startPoint" && (
        <SubMenu>
          <D2Input
            value={shape.startPoint}
            onChange={(val) => {
              setShape({ startPoint: val });
            }}
          />
        </SubMenu>
      )}
      {showSubMenu === "endPoint" && (
        <SubMenu>
          <D2Input
            value={shape.endPoint}
            onChange={(val) => {
              setShape({ endPoint: val });
            }}
          />
        </SubMenu>
      )}

      {showSubMenu === "thickness" && (
        <SubMenu>
          <InputField
            inputKey={1}
            label={"thickness"}
            value={shape.thickness}
            onChange={(val) => {
              setShape({ thickness: val });
            }}
          />
        </SubMenu>
      )}
    </div>
  );
};

export default DetailMenu;
