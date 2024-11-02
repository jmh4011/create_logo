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
    <div className="MainPageBody">
      <div className="upper-section">
        <Canvas
          mode={mode}
          canvasObjects={canvasObjects}
          canvasObjectIds={canvasObjectIds}
          setCanvasObjects={setCanvasObjects}
          setCanvasObjectIds={setCanvasObjectIds}
        />
      </div>
      <div className="lower-section">
        <EditNavigator setMode={setMode} />
      </div>
    </div>
  );
};

export default MainPage;
