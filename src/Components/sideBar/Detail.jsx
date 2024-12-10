import React, { useState } from "react";
import useCanvas from "../../features/canvas/useCanvas";
import { RgbaStringColorPicker } from "react-colorful";

const Detail = () => {
  const { shapes, selectedShapeId, updateShape } = useCanvas();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const shape = shapes[selectedShapeId];

  const handleChange = (label, value) => {
    updateShape(selectedShapeId, { [label]: value });
  };

  const InputButton = ({ children, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="overflow-x-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span className="text-xl font-medium">{label}</span>
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        {isOpen && <div className="my-2">{children}</div>}
      </div>
    );
  };

  const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    step,
    min,
    max,
  }) => (
    <div>
      {label}:
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        min={min}
        max={max}
        className="w-full p-1 border rounded"
      />
    </div>
  );

  const InputField2D = ({ label }) => {
    const value = shape[label];
    return (
      <InputButton label={`${label} (${value.x}, ${value.y})`}>
        <InputField
          label="X"
          type="number"
          value={value.x}
          onChange={(val) =>
            handleChange(label, { x: parseInt(val), y: value.y })
          }
        />
        <InputField
          label="Y"
          type="number"
          value={value.y}
          onChange={(val) =>
            handleChange(label, { x: value.x, y: parseInt(val) })
          }
        />
      </InputButton>
    );
  };

  const InputFieldColor = ({ label }) => {
    const defaultColor = { r: 255, g: 255, b: 255, a: 1 };
    const color = shape[label] || defaultColor;

    const handleColorUpdate = (key, value) => {
      const updatedColor = {
        ...color,
        [key]:
          key === "a"
            ? Math.min(1, Math.max(0, parseFloat(value)))
            : Math.min(255, Math.max(0, parseInt(value))),
      };
      handleChange(label, updatedColor);
    };

    return (
      <InputButton
        label={`${label} rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
      >
        <div className="mb-2">
          <RgbaStringColorPicker
            color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
            onChange={(rgbaString) => {
              const match = rgbaString.match(
                /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/
              );
              if (match) {
                const [_, r, g, b, a] = match;
                handleChange(label, {
                  r: parseInt(r),
                  g: parseInt(g),
                  b: parseInt(b),
                  a: parseFloat(a || 1),
                });
              }
            }}
          />
        </div>
        {["r", "g", "b", "a"].map((key) => (
          <InputField
            key={key}
            label={key.toUpperCase()}
            type="number"
            value={color[key]}
            onChange={(value) => handleColorUpdate(key, value)}
            step={key === "a" ? 0.01 : 1}
            min={key === "a" ? 0 : 0}
            max={key === "a" ? 1 : 255}
          />
        ))}
      </InputButton>
    );
  };

  const InputFieldBorder = ({ label }) => {
    const defaultBorder = {
      width: 2,
      style: "solid",
      color: { r: 0, g: 0, b: 0, a: 1 },
    };
    const border = shape[label] || defaultBorder;

    return (
      <InputButton
        label={`${label} (width: ${border.width}, style: ${border.style})`}
      >
        <InputField
          label="Width"
          type="number"
          value={border.width}
          onChange={(val) =>
            handleChange(label, { ...border, width: parseInt(val) })
          }
        />
        <div className="mt-2">
          Border Style:
          <select
            value={border.style}
            onChange={(e) =>
              handleChange(label, { ...border, style: e.target.value })
            }
            className="w-full p-1 border rounded"
          >
            {[
              "solid",
              "dotted",
              "dashed",
              "double",
              "groove",
              "ridge",
              "inset",
              "outset",
              "none",
              "hidden",
            ].map((style) => (
              <option key={style} value={style}>
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <InputFieldColor label={`${label}.color`} />
      </InputButton>
    );
  };

  const renderFieldsByShapeType = () => {
    if (!shape) return null;

    switch (shape.type) {
      case "rectangle":
      case "circle":
        return (
          <>
            <InputField2D label="position" />
            <InputField2D label="size" />
            <InputFieldColor label="color" />
            <InputFieldBorder label="border" />
          </>
        );

      case "line":
        return (
          <>
            <InputField2D label="startPoint" />
            <InputField2D label="endPoint" />
            <InputFieldColor label="color" />
            <InputField
              label="Thickness"
              type="number"
              value={shape.thickness}
              onChange={(val) => handleChange("thickness", parseInt(val))}
            />
          </>
        );

      case "text":
        return (
          <>
            <InputField2D label="position" />
            <InputFieldColor label="fontColor" />
            <InputField
              label="Font Size"
              type="number"
              value={shape.fontSize}
              onChange={(val) => handleChange("fontSize", parseInt(val))}
            />
            <InputField
              label="Text"
              type="text"
              value={shape.text}
              onChange={(val) => handleChange("text", val)}
            />
          </>
        );

      case "icon":
        return (
          <>
            <InputField2D label="position" />
            <InputField2D label="size" />
            <InputFieldColor label="iconColor" />
            <InputFieldColor label="backgroundColor" />
          </>
        );

      default:
        console.warn(`Unknown shape type: ${shape.type}`);
        return null;
    }
  };

  return (
    <div className="w-full px-4">
      <button
        onClick={() => setIsDetailOpen(!isDetailOpen)}
        className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
      >
        <span className="text-xl font-medium">Detail</span>
        <span
          className={`transform transition-transform ${
            isDetailOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {selectedShapeId !== undefined && isDetailOpen && (
        <div className="w-full h-80 border border-white mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {renderFieldsByShapeType()}
        </div>
      )}
    </div>
  );
};

export default Detail;
