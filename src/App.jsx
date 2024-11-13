import { useState } from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import MainPage from "./Components/MainPage/MainPage";

function App() {
  const [mode, setMode] = useState("rectangle"); // 'rectangle' | 'circle' | 'line' | 'text' |'move' 모드를 설정
  const [canvasObjects, setCanvasObjects] = useState({});
  const [canvasObjectIds, setCanvasObjectIds] = useState([]);
  return (
    <div className="container">
      <SideBar />
      <MainPage
        mode={mode}
        setMode={setMode}
        canvasObjects={canvasObjects}
        canvasObjectIds={canvasObjectIds}
        setCanvasObjects={setCanvasObjects}
        setCanvasObjectIds={setCanvasObjectIds}
      />
    </div>
  );
}

export default App;
