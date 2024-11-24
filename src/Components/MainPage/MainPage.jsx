import React from "react";
import Canvas from "../Canvas/Canvas";
import Footer from "../Footer/Footer";

const MainPage = () => {
  return (
    <div className="h-full w-full grid grid-rows-5">
      <div className="row-span-4">
        <Canvas />
      </div>
      <div className="row-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
