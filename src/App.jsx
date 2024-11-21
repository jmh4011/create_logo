import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import MainPage from "./Components/MainPage/MainPage";
import Navbar from "./Components/Home/Navbar";
import Hero from "./Components/Home/Hero";
import About from "./Components/Home/About";
import Technologies from "./Components/Home/Technologies";
import Experience from "./Components/Home/Experience";
import Galleries from "./Components/Home/Galleries";

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
          <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-black">
            <div className="relative w-screen">
              <div className="container mx-auto px-8">
                <Navbar />
                <Hero />
                <About />
                <Technologies />
                <Experience />
                <Galleries />
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/create-logo"
        element={
          <div className="grid grid-rows-10 md:grid-cols-10 md:grid-rows-1 h-screen">
            <div className="row-span-1 md:col-span-2 bg-black">
              <SideBar
                mode={mode}
                setMode={setMode}
                canvasObjects={canvasObjects}
                setCanvasObjects={setCanvasObjects}
                canvasObjectIds={canvasObjectIds}
                setCanvasObjectIds={setCanvasObjectIds}
                selectedCanvasObjectId={selectedCanvasObjectId}
                setSelectedCanvasObjectId={setSelectedCanvasObjectId}
              />
            </div>

            <div className="row-span-9 md:col-span-8 bg-white text-black">
              <MainPage
                mode={mode}
                setMode={setMode}
                canvasObjects={canvasObjects}
                setCanvasObjects={setCanvasObjects}
                canvasObjectIds={canvasObjectIds}
                setCanvasObjectIds={setCanvasObjectIds}
                selectedCanvasObjectId={selectedCanvasObjectId}
                setSelectedCanvasObjectId={setSelectedCanvasObjectId}
              />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
