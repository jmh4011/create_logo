import React, { useState, useCallback, useMemo } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import useCanvas from "../../features/canvas/useCanvas";

const InputButton = React.memo(({ label, isOpen, onToggle, children }) => {
  return (
    <div className="overflow-x-hidden">
      <button
        onClick={onToggle}
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
});

// InputField 컴포넌트
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  step,
  min,
  max,
  onFocusChange,
}) => {
  const handleFocus = () => {
    onFocusChange(true);
  };

  const handleBlur = () => {
    onFocusChange(false);
  };

  return (
    <div>
      {label}:
      <input
        type={type}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        min={min}
        max={max}
        className="w-full p-1 border rounded bg-gray-800 text-white"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};
const Detail = () => {
  const { shapes, selectedShapeId, updateShape } = useCanvas();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [openStates, setOpenStates] = useState({});
  const [isInputFocused, setIsInputFocused] = useState(false);

  const shapeWhenFocused = useMemo(() => {
    return shapes[selectedShapeId];
  }, [selectedShapeId, isInputFocused]);

  const shapeWhenNotFocused = useMemo(() => {
    return shapes[selectedShapeId];
  }, [selectedShapeId, shapes, isInputFocused]);

  const shape = isInputFocused ? shapeWhenFocused : shapeWhenNotFocused;

  console.log(shape.position);

  const handleChange = useCallback(
    (label, value) => {
      updateShape(selectedShapeId, { [label]: value });
    },
    [selectedShapeId, updateShape]
  );

  const toggleOpen = useCallback((label) => {
    setOpenStates((prev) => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const InputField2D = React.memo(({ label }) => {
    const value = shape[label];
    return (
      <InputButton
        label={`${label} (${value.x}, ${value.y})`}
        isOpen={!!openStates[label]}
        onToggle={() => toggleOpen(label)}
      >
        <InputField
          label="X"
          type="number"
          value={value.x}
          onChange={(val) =>
            handleChange(label, { x: parseInt(val, 10), y: value.y })
          }
          onFocusChange={setIsInputFocused}
        />
        <InputField
          label="Y"
          type="number"
          value={value.y}
          onChange={(val) =>
            handleChange(label, { x: value.x, y: parseInt(val, 10) })
          }
          onFocusChange={setIsInputFocused}
        />
      </InputButton>
    );
  });

  const InputFieldColor = React.memo(({ label }) => {
    const defaultColor = { r: 255, g: 255, b: 255, a: 1 };
    const color = shape[label] || defaultColor;

    const handleColorUpdate = useCallback(
      (key, value) => {
        const updatedColor = {
          ...color,
          [key]:
            key === "a"
              ? Math.min(1, Math.max(0, parseFloat(value)))
              : Math.min(255, Math.max(0, parseInt(value, 10))),
        };
        handleChange(label, updatedColor);
      },
      [color, handleChange, label]
    );

    return (
      <InputButton
        label={`${label} rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
        isOpen={!!openStates[label]}
        onToggle={() => toggleOpen(label)}
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
                  r: parseInt(r, 10),
                  g: parseInt(g, 10),
                  b: parseInt(b, 10),
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
            onFocusChange={setIsInputFocused}
          />
        ))}
      </InputButton>
    );
  });

  const renderFieldsByShapeType = useCallback(() => {
    if (!shape) return null;

    switch (shape.type) {
      case "rectangle":
      case "circle":
        return (
          <>
            <InputField2D label="position" />
            <InputField2D label="size" />
            <InputFieldColor label="color" />
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
              onChange={(val) => handleChange("thickness", parseInt(val, 10))}
              onFocusChange={setIsInputFocused}
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
              onChange={(val) => handleChange("fontSize", parseInt(val, 10))}
              onFocusChange={setIsInputFocused}
            />
            <InputField
              label="Text"
              type="text"
              value={shape.text}
              onChange={(val) => handleChange("text", val)}
              onFocusChange={setIsInputFocused}
            />
          </>
        );

      case "icon":
        return (
          <>
            <InputField2D label="position" />
            <InputField2D label="size" />
            <InputFieldColor label="color" />
            <InputFieldColor label="backgroundColor" />
          </>
        );

      default:
        console.warn(`Unknown shape type: ${shape.type}`);
        return null;
    }
  }, [shape, handleChange, openStates, toggleOpen, isInputFocused]);

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
