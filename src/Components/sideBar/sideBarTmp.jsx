import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import * as FaIcons from "react-icons/fa";
import Shapes from "./shapes";
import Tools from "./Tools";
import Icons from "./Icons";
import Detail from "./Detail";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSidebarContent = () => (
    <div className="w-full flex flex-col space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      <Shapes />
      <Tools />
      <Detail />
      <Icons />
    </div>
  );
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden lg:block h-screen bg-black text-white w-full 
        overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-800"
      >
        <div className="p-4 flex justify-start">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>
        {renderSidebarContent()}
      </div>

      {/* Mobile & Tablet Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-black text-white z-40">
        <div className="h-16 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
          <button onClick={toggleSidebar} className="text-white">
            <FaIcons.FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Slide Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen w-full bg-black text-white 
          transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 px-4 flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
          <button onClick={toggleSidebar} className="text-white">
            <FaIcons.FaTimes className="text-2xl" />
          </button>
        </div>
        <div
          className="overflow-y-auto h-[calc(100vh-4rem)] 
          scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600"
        >
          {renderSidebarContent()}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
