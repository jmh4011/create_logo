import { useState } from "react";
import "./App.css";
import SideBar from './Components/SideBar/SideBar';
import MainPage from "./Components/MainPage/MainPage";

function App() {

  const [mode, setMode] = useState("rectangle"); // 'rectangle' | 'circle' | 'line' | 'move' 모드를 설정
  const [canvasObjects, setCanvasObjects] = useState({});
  const [canvasObjectIds, setCanvasObjectIds] = useState([]);
  return (
    <div className="container">
      <SideBar />
      <MainPage />
    </div>
  );
}

export default App;
