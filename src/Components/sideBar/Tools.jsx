import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import useMode from "../../features/mode/useMode";

const Tools = () => {
  const modeButtons = [
    { mode: null, icon: <FaIcons.FaMousePointer />, label: "Select" },
    { mode: "rectangle", icon: <FaIcons.FaSquare />, label: "Rectangle" },
    { mode: "circle", icon: <FaIcons.FaCircle />, label: "Circle" },
    { mode: "line", icon: <FaIcons.FaPen />, label: "Line" },
    { mode: "text", icon: <FaIcons.FaTextWidth />, label: "Text" },
  ];
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const { mode, setMode } = useMode();

  const changeMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="w-full px-4">
      <button
        onClick={() => setIsToolsOpen(!isToolsOpen)}
        className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
      >
        <span className="text-xl font-medium">Tools</span>
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
        <div className="grid grid-cols-2 gap-2 mt-2 w-full">
          {modeButtons.map((button) => (
            <button
              key={button.label}
              onClick={() => changeMode(button.mode)}
              className={`flex items-center justify-center p-2 rounded ${
                mode === button.mode
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {button.icon}
              <span className="ml-2">{button.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
