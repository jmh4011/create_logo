import React, { useState } from "react";
import useCanvas from "../../features/canvas/useCanvas";
import { RgbaStringColorPicker } from "react-colorful";

const ShapeDetail = ({ shapeId }) => {
  const { shapes, updateShape } = useCanvas();

  let shape = shapes[shapeId];

  const handleChange = (label, value) => {
    updateShape(shapeId, { [label]: value });
  };

  const InputFieldText = ({ label }) => {
    <div>
      {label}:
      <input
        type="text"
        defaultValue={shape[label]}
        onChange={(e) => handleChange(label, e.target.value)}
      />
    </div>;
  };

  const InputFieldNumber = ({ label }) => {
    return (
      <div>
        {label}:
        <input
          type="number"
          defaultValue={shape[label]}
          onChange={(e) => handleChange(label, e.target.value)}
        />
      </div>
    );
  };

  const InputField2D = ({ label }) => {
    const [isOpen, setIsOpen] = useState(false);
    let value = shape[label];
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isLayersOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span className="text-xl font-medium">
            {label} ({value.x}, {value.y})
          </span>
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        {isOpen && (
          <div>
            <div>
              X:
              <input
                type="number"
                defaultValue={value.x}
                onChange={(e) =>
                  handleChange(label, { x: e.target.value, y: value.y })
                }
              />
            </div>
            <div>
              Y:
              <input
                type="number"
                defaultValue={value.y}
                onChange={(e) =>
                  handleChange(label, { x: value.x, y: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const InputFieldColor = ({ label }) => {
    const [isOpen, setIsOpen] = useState(false);

    // 기본값: color 객체가 없는 경우 초기화
    const defaultColor = { r: 255, g: 255, b: 255, a: 1 };
    const color = shape[label] || defaultColor;

    // 색상 변경 핸들러 (개별 RGBA 속성 업데이트)
    const handleColorChange = (key, value) => {
      const newColor = {
        ...color,
        [key]: Math.min(255, Math.max(0, parseInt(value) || 0)), // 0~255 범위 제한
      };
      handleChange(label, newColor);
    };

    // A (Alpha) 값은 0~1 범위로 처리
    const handleAlphaChange = (value) => {
      const newColor = {
        ...color,
        a: Math.min(1, Math.max(0, parseFloat(value) || 0)), // 0~1 범위 제한
      };
      handleChange(label, newColor);
    };

    // Color Picker 변경 핸들러
    const handlePickerChange = (rgbaString) => {
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
    };

    return (
      <div>
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
        {isOpen && (
          <div className="my-2">
            {/* Color Picker */}
            <div className="mb-2">
              <RgbaStringColorPicker
                color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
                onChange={handlePickerChange}
              />
            </div>

            {/* RGBA Input Fields */}
            <div className="flex flex-col gap-2">
              <div>
                R:
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={color.r}
                  onChange={(e) => handleColorChange("r", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </div>
              <div>
                G:
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={color.g}
                  onChange={(e) => handleColorChange("g", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </div>
              <div>
                B:
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={color.b}
                  onChange={(e) => handleColorChange("b", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </div>
              <div>
                A:
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={color.a}
                  onChange={(e) => handleAlphaChange(e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <InputField2D label={"position"} />
      <InputField2D label={"size"} />
      <InputFieldColor label={"color"} />
    </div>
  );
};

export default ShapeDetail;
