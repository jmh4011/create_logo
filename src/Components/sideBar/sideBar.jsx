import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import useCanvas from "../../features/canvas/useCanvas";
import useMode from "../../features/mode/useMode";
import {
  FaMousePointer,
  FaSquare,
  FaCircle,
  FaPen,
  FaTextWidth,
} from "react-icons/fa";

const SideBar = () => {
  const { shapeIds, selectedShapeId, selectShape, removeShape } = useCanvas();
  const { mode, changeMode } = useMode();

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

      <div className="overflow-y-auto overflow-x-hidden w-full h-24 border border-white mt-4 flex-none">
        {shapeIds.map((id) => (
          <input
            key={id}
            value={`Shape ${id}`}
            readOnly
            className={`bg-black border text-white p-2 w-full ${
              id === selectedShapeId ? "border-blue-600" : ""
            }`}
            onClick={() => selectShape(id)}
          />
        ))}
      </div>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
      >
        Delete
      </button>
      <div className="flex gap-2 mt-4">
        {modeButtons.map((btn) => (
          <button
            key={btn.mode}
            onClick={() => changeMode(btn.mode)}
            className={`p-2 rounded ${
              mode === btn.mode
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            } hover:bg-blue-400 hover:text-white`}
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
