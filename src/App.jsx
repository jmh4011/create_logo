import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/sideBar/sideBar";
import MainPage from "./Components/MainPage/MainPage";
import Navbar from "./Components/Home/Navbar";

function App() {
  const [mode, setMode] = useState("rectangle");
  const [canvasObjects, setCanvasObjects] = useState({});
  const [canvasObjectIds, setCanvasObjectIds] = useState([]);
  const [selectedCanvasObjectId, setSelectedCanvasObjectId] = useState();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar />
          </div>
        }
      />
      <Route
        path="/create-logo"
        element={
          <div className="grid grid-rows-10 md:grid-cols-10 md:grid-rows-1 h-screen">
            <div className="row-span-1 md:col-span-2 bg-black">
              <SideBar />
            </div>

            <div className="row-span-9 md:col-span-8 bg-white text-black">
              <MainPage />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
