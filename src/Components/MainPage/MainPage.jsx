import React from "react";
import Canvas from "../Canvas/Canvas";
import Footer from "../Footer/Footer";

const MainPage = () => {
  return (
    <div className="h-full w-full grid grid-rows-5 bg-white">
      <div className="row-span-4 h-full w-full bg-white">
        <Canvas />
      </div>
      <div className="row-span-1 h-full w-full bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
