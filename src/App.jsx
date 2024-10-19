import { useState } from "react";
import "./App.css";
import SideBar from './Components/SideBar/SideBar';
import Canvas from "./Components/Canvas/Canvas";

function App() {
  return (
    <div className="container">
      <SideBar />
      <Canvas />
    </div>
  );
}

export default App;
