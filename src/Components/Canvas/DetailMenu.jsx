import React, { useState, useCallback } from "react";

const DetailMenu = ({
  id,
  position,
  canvasObject,
  setCanvasObject,
  onClose,
  onDelete,
}) => {
  const [showSubMenu, setShowSubMenu] = useState(null);
  let hoverTimer;

  const handleMouseEnter = (idx) => {
    hoverTimer = setTimeout(() => setShowSubMenu(idx), 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setShowSubMenu(null);
  };

  const handleChange = (key, value) => {
    setCanvasObject({
      ...canvasObject,
      [key]: value,
    });
  };

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        backgroundColor: "rgba(0,0,0,0)",
        zIndex: 1000,
        display: "grid",
        gridTemplateRows: "1fr auto", // 1행은 기본 메뉴, 2행은 서브 메뉴
        gridTemplateColumns: "1fr auto",
      }}
    >
      {/* 기본 메뉴 */}
      <div
        style={{
          gridColumn: 1,
          gridRow: 1, // ID는 전체 가로 너비 차지
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid gray",
        }}
      >
        Object ID: {id}
      </div>
      <div
        style={{
          gridColumn: 1,
          gridRow: 2,
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid gray",
        }}
        onMouseEnter={() => handleMouseEnter(1)}
      >
        position
      </div>
      <div
        style={{
          gridColumn: 1,
          gridRow: 3,
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid gray",
        }}
        onMouseEnter={() => handleMouseEnter(2)}
      >
        size
      </div>
      <div
        style={{
          gridColumn: 1,
          gridRow: 4,
          backgroundColor: "rgb(255,255,255)",
          border: "1px solid gray",

          cursor: "pointer",
          color: "red",
        }}
        onClick={handleDelete}
      >
        Delete
      </div>

      {/* 서브 메뉴 */}
      {showSubMenu === 1 && (
        <div
          style={{
            gridColumn: 2,
            gridRow: "2 / 4",
            backgroundColor: "rgb(255,255,255)",
            border: "1px solid gray",
          }}
        >
          <div>
            x:
            <input
              type="number"
              defaultValue={canvasObject.position.x}
              onChange={(e) =>
                handleChange("position", {
                  ...canvasObject.position,
                  x: +e.target.value,
                })
              }
            />
          </div>
          <div>
            y:
            <input
              type="number"
              defaultValue={canvasObject.position.y}
              onChange={(e) =>
                handleChange("position", {
                  ...canvasObject.position,
                  y: +e.target.value,
                })
              }
            />
          </div>
        </div>
      )}

      {showSubMenu === 2 && (
        <div
          style={{
            gridColumn: 3,
            gridRow: "3 / 5",
            backgroundColor: "rgb(255,255,255)",
            border: "1px solid gray",
          }}
        >
          <div>
            width:
            <input
              type="number"
              defaultValue={canvasObject.size.width}
              onChange={(e) =>
                handleChange("size", {
                  ...canvasObject.size,
                  width: +e.target.value,
                })
              }
            />
          </div>
          <div>
            height:
            <input
              type="number"
              defaultValue={canvasObject.size.height}
              onChange={(e) =>
                handleChange("size", {
                  ...canvasObject.size,
                  height: +e.target.value,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMenu;
