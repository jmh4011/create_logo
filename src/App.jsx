import { useState } from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import MainPage from "./Components/MainPage/MainPage";

function App() {
  const [mode, setMode] = useState("rectangle");
  const [canvasObjects, setCanvasObjects] = useState({});
  const [canvasObjectIds, setCanvasObjectIds] = useState([]);

  return (
    <div className="grid grid-rows-10 md:grid-cols-10 md:grid-rows-1 h-screen">
      <div className="row-span-1 md:col-span-2 bg-black">
        <SideBar />
      </div>

      <div className="row-span-9 md:col-span-8 bg-white text-black">
        <MainPage
          mode={mode}
          setMode={setMode}
          canvasObjects={canvasObjects}
          canvasObjectIds={canvasObjectIds}
          setCanvasObjects={setCanvasObjects}
          setCanvasObjectIds={setCanvasObjectIds}
        />
      </div>
    </div>
  );
}

export default App;
