import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import * as FaIcons from "react-icons/fa";
import Layers from "./Layers";
import Tools from "./Tools";
import Icons from "./Icons";
import html2canvas from "html2canvas";
import Detail from "./Detail";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSaveClick = async () => {
    const canvasElement = document.getElementById("drawing-canvas");
    if (!canvasElement) return;

    try {
      const canvas = await html2canvas(canvasElement, {
        width: canvasElement.offsetWidth * 2,
        height: canvasElement.offsetHeight * 2,
        scale: 2,
      });
      const imageUrl = canvas.toDataURL("image/png");
      setPreviewImage(imageUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error capturing canvas:", error);
    }
  };

  const handleDownload = () => {
    if (!previewImage) return;

    const link = document.createElement("a");
    link.download = "canvas-drawing.png";
    link.href = previewImage;
    link.click();
  };

  const renderSidebarContent = () => (
    <div className="w-full h-full flex flex-col space-y-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="px-4 py-2">
        <button
          onClick={handleSaveClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
          transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <FaIcons.FaSave className="text-lg" />
          <span>Save Images</span>
        </button>
      </div>
      <Layers />
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
      <div className="hidden lg:block h-screen bg-black text-white w-full">
        <div className="p-4 flex justify-start">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>
        {renderSidebarContent()}
      </div>

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
        <div className="overflow-y-auto overflow-x-hidden h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {renderSidebarContent()}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 relative z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Save Image</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaIcons.FaTimes className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              {previewImage && (
                <div className="border border-gray-600 rounded-lg overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Canvas Preview"
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
