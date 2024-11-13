import { useState } from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import MainPage from "./Components/MainPage/MainPage";

function App() {
  const [mode, setMode] = useState("rectangle"); // 'rectangle' | 'circle' | 'line' | 'text' |'move' 모드를 설정
  const [canvasObjects, setCanvasObjects] = useState({});
  const [canvasObjectIds, setCanvasObjectIds] = useState([]);
  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-2 bg-blue-500">a</div>
      <div className="col-span-8 bg-red-500">b</div>
    </div>
  );
}

export default App;

// npx tailwindcss init -p
