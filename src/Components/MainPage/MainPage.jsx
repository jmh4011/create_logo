import React from "react";
import Canvas from "../Canvas/Canvas";
import EditNavigator from "../EditNavigator/EditNavigator";

const MainPage = ({
  mode,
  setMode,
  canvasObjects,
  setCanvasObjects,
  canvasObjectIds,
  setCanvasObjectIds,
}) => {
  return (
    <div className="h-full w-full grid grid-rows-5 bg-white">
      <div className="row-span-4 h-full w-full bg-white">
        <Canvas
          mode={mode}
          canvasObjects={canvasObjects}
          canvasObjectIds={canvasObjectIds}
          setCanvasObjects={setCanvasObjects}
          setCanvasObjectIds={setCanvasObjectIds}
        />
      </div>
      <div className="row-span-1 h-full w-full bg-white">
        <EditNavigator setMode={setMode} />
      </div>
    </div>
  );
};

export default MainPage;