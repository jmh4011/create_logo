import React from "react";
import Canvas from "../Canvas/Canvas";
import EditNavigator from "../EditNavigator/EditNavigator";

const MainPage = () => {
  return (
    <div className="MainPageBody">
      <div className="upper-section">
        <Canvas />
      </div>
      <div className="lower-section">
        <EditNavigator />
      </div>
    </div>
  );
};

export default MainPage;
