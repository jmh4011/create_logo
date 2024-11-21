import React from "react";
import Canvas from "../Canvas/Canvas";
import EditNavigator from "../EditNavigator/EditNavigator";

const MainPage = () => {
  return (
    <div className="h-full w-full grid grid-rows-5 bg-white">
      <div className="row-span-4 h-full w-full bg-white">
        <Canvas />
      </div>
      <div className="row-span-1 h-full w-full bg-white">
        <EditNavigator />
      </div>
    </div>
  );
};

export default MainPage;
