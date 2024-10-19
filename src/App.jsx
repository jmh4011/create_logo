import { useState } from "react";
import "./App.css";
import SideBar from './Components/SideBar/SideBar';
import MainPage from "./Components/MainPage/MainPage";

function App() {
  return (
    <div className="container">
      <SideBar />
      <MainPage />
    </div>
  );
}

export default App;
