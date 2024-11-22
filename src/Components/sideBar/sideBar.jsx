import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import useCanvas from "../../features/canvas/useCanvas";
import useMode from "../../features/mode/useMode";

import { FaMousePointer, FaSquare, FaCircle, FaPen, FaTextWidth } from "react-icons/fa";

const SideBar = () => {
  const { shapeIds, selectedShapeId, selectShape, removeShape } = useCanvas();
  const { mode, changeMode } = useMode();

  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(true);

  const handleDelete = () => {
    if (selectedShapeId !== undefined) {
      removeShape(selectedShapeId);
    } else {
      alert("No shape selected!");
    }
  };

  const modeButtons = [
    { mode: null, icon: <FaMousePointer />, label: "Select" },
    { mode: "rectangle", icon: <FaSquare />, label: "Rectangle" },
    { mode: "circle", icon: <FaCircle />, label: "Circle" },
    { mode: "line", icon: <FaPen />, label: "Line" },
    { mode: "text", icon: <FaTextWidth />, label: "Text" },
  ];

  return (
    <div className="h-auto md:h-20 min-h-0 max-h-[80vh] flex flex-col items-start p-4 bg-black text-white">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-8 md:h-12 lg:h-16 w-auto" />
      </Link>

      <div className="mt-4 w-full">
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span>Layers</span>
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
          <div className="overflow-y-auto overflow-x-hidden w-full h-80 border border-white mt-2">
            {shapeIds.map((id) => (
              <div
                key={id}
                onClick={() => selectShape(id)}
                className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-gray-800 ${
                  id === selectedShapeId ? "bg-gray-700" : "bg-black"
                }`}
              >
                <span className="text-sm font-medium text-gray-200">
                  Shape {id}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleDelete}
            className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>

        <button
          onClick={() => setIsToolsOpen(!isToolsOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded mt-4"
        >
          <span>Tools</span>
          <span
            className={`transform transition-transform ${
              isToolsOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isToolsOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-4 gap-2 mt-2 p-2 max-h-[300px] overflow-y-auto">
            {modeButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => changeMode(button.mode)}
                className="flex flex-col items-center justify-center p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <div className="text-2xl text-gray-200">{button.icon}</div>
                <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">
                  {button.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
