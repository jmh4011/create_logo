import React, { useState } from "react";
import useCanvas from "../../features/canvas/useCanvas";
import ShapeDetail from "./Detail";

const Shapes = () => {
  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);
  const { shapes, shapeIds, selectedShapeId, selectShape, removeShape } =
    useCanvas();

  const [isDetailMenuHash, setIsDetailMenuHash] = useState({});

  const handleSelectShape = (event, id) => {
    selectShape(id);
    const rect = event.target.getBoundingClientRect();
    setSelectedElement({ x: rect.right, y: rect.top });
  };

  const deleteSelectedShape = () => {
    if (selectedShapeId !== undefined) {
      removeShape(selectedShapeId);
    } else {
      alert("No shape selected!");
    }
  };

  return (
    <div className="w-full px-4">
      <button
        onClick={() => setIsLayersOpen(!isLayersOpen)}
        className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
      >
        <span className="text-xl font-medium">Layers</span>
        <span
          className={`transform transition-transform ${
            isLayersOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isLayersOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full h-80 border border-white mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {shapeIds.map((id) => (
            <div key={id}>
              <div
                onClick={(e) => {
                  handleSelectShape(e, id);
                }}
                className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-gray-800 ${
                  id === selectedShapeId ? "bg-gray-700" : "bg-black"
                }`}
              >
                <span className="text-sm font-medium text-gray-200">
                  {shapes[id].name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={deleteSelectedShape}
          className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Shapes;
