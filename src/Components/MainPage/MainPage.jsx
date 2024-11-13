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
    <div className="h-full grid grid-rows-10">
      <div className="upper-section row-span-8">
        <Canvas
          mode={mode}
          canvasObjects={canvasObjects}
          canvasObjectIds={canvasObjectIds}
          setCanvasObjects={setCanvasObjects}
          setCanvasObjectIds={setCanvasObjectIds}
        />
      </div>
      <div className="lower-section row-span-2">
        <EditNavigator setMode={setMode} />
      </div>
    </div>
  );
};

export default MainPage;
