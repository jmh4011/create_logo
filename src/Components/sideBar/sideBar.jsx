import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const SideBar = ({
  mode,
  setMode,
  canvasObjects,
  setCanvasObjects,
  canvasObjectIds,
  setCanvasObjectIds,
}) => {
  return (
    <div className="h-auto md:h-20 min-h-0 max-h-[80vh] flex flex-col items-start p-4 bg-black text-white">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-8 md:h-12 lg:h-16 w-auto" />
      </Link>
      <div className="overflow-y-auto overflow-x-hidden w-full h-24 border border-white flex-none">
        {canvasObjectIds.map((id) => {
          return (
            <input
              key={id}
              defaultValue={id}
              readOnly
              className="bg-black border"
            />
          );
        })}
      </div>
      <button>delete</button>
    </div>
  );
};
export default SideBar;
