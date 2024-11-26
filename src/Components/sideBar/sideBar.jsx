import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import useCanvas from "../../features/canvas/useCanvas";
import useMode from "../../features/mode/useMode";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as DiIcons from "react-icons/di";
import * as FiIcons from "react-icons/fi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";

const modeButtons = [
  { mode: null, icon: <FaIcons.FaMousePointer />, label: "Select" },
  { mode: "rectangle", icon: <FaIcons.FaSquare />, label: "Rectangle" },
  { mode: "circle", icon: <FaIcons.FaCircle />, label: "Circle" },
  { mode: "line", icon: <FaIcons.FaPen />, label: "Line" },
  { mode: "text", icon: <FaIcons.FaTextWidth />, label: "Text" },
];

const iconLibraries = {
  Fa: () => import('react-icons/fa'),
  Ai: () => import('react-icons/ai'),
  Bi: () => import('react-icons/bi'),
  Bs: () => import('react-icons/bs'),
  Cg: () => import('react-icons/cg'),
  Di: () => import('react-icons/di'),
  Fi: () => import('react-icons/fi'),
  Go: () => import('react-icons/go'),
  Gr: () => import('react-icons/gr'),
  Hi: () => import('react-icons/hi'),
  Im: () => import('react-icons/im'),
  Io: () => import('react-icons/io'),
  Md: () => import('react-icons/md'),
  Ri: () => import('react-icons/ri'),
  Si: () => import('react-icons/si'),
  Ti: () => import('react-icons/ti'),
  Vsc: () => import('react-icons/vsc'),
  Wi: () => import('react-icons/wi'),
};

const SideBar = () => {
  const { shapeIds, selectedShapeId, selectShape, removeShape } = useCanvas();
  const { mode, selectedIcon, setMode, setSelectedIcon } = useMode();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [isIconsOpen, setIsIconsOpen] = useState(false);
  const [displayedIcons, setDisplayedIcons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedLibraries, setLoadedLibraries] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentLibraryIndex, setCurrentLibraryIndex] = useState(0);
  const libraryNames = Object.keys(iconLibraries);
  const ICONS_PER_LOAD = 32;

  const allIcons = useMemo(() => {
    return [
      ...Object.entries(FaIcons),
      ...Object.entries(AiIcons),
      ...Object.entries(BiIcons),
      ...Object.entries(BsIcons),
      ...Object.entries(CgIcons),
      ...Object.entries(DiIcons),
      ...Object.entries(FiIcons),
      ...Object.entries(GoIcons),
      ...Object.entries(GrIcons),
      ...Object.entries(HiIcons),
      ...Object.entries(ImIcons),
      ...Object.entries(IoIcons),
      ...Object.entries(MdIcons),
      ...Object.entries(RiIcons),
      ...Object.entries(SiIcons),
      ...Object.entries(TiIcons),
      ...Object.entries(VscIcons),
      ...Object.entries(WiIcons),
    ].filter(([name]) =>
      /^(Fa|Ai|Bi|Bs|Cg|Di|Fi|Go|Gr|Hi|Im|Io|Md|Ri|Si|Ti|Vsc|Wi)/.test(name)
    );
  }, []);

  const filteredIcons = useMemo(() => {
    if (searchTerm.trim() === "") return displayedIcons;
    return displayedIcons.filter(([name]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, displayedIcons]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(0);
  };

  const handleDelete = () => {
    if (selectedShapeId !== undefined) {
      removeShape(selectedShapeId);
    } else {
      alert("No shape selected!");
    }
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const handleSaveClick = () => {
    setShowAdModal(true);
  };

  const renderIconGrid = () => (
    <div
      className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
          loadMoreIcons();
        }
      }}
    >
      <div className="grid grid-cols-4 gap-2 mt-2 p-2">
        {filteredIcons.map(([name, Icon]) => (
          <div
            key={name}
            className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer 
              
              ${
                selectedIcon === name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
              `}
            onClick={() => {
              handleSelectIcon(name, Icon);
            }}
          >
            <Icon className="text-2xl text-white" />
            <span className="text-xs text-white mt-1 truncate w-full text-center">
              {name.replace(/^(Fa|Ai|Bi|Bs|Cg|Di|Fi|Go|Gr|Hi|Im|Io|Md|Ri|Si|Ti|Vsc|Wi)/, "")}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="col-span-4 flex justify-center py-4">
            <span className="text-white">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (isIconsOpen && displayedIcons.length === 0) {
      loadMoreIcons();
    }
  }, [isIconsOpen]);

  const handleDelete = () => {
    if (selectedShapeId !== undefined) {
      removeShape(selectedShapeId);
    } else {
      alert("No shape selected!");
    }
  };

  const renderSidebarContent = () => (
    <div className="w-full h-full flex flex-col space-y-4">
      {/* Layers Section */}
      <div className="w-full px-4">
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span className="text-xl font-medium">Layers</span>
          <span
            className={`transform transition-transform ${
              isLayersOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isLayersOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full h-80 border border-white mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {shapeIds.map((id) => (
              <div
                key={id}
                onClick={() => selectShape(id)}
                className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-gray-800 ${
                  id === selectedShapeId ? "bg-gray-700" : "bg-black"
                }`}
              >
                <span className="text-sm font-medium text-gray-200">
                  Shape {id}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleDelete}
            className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tools Section */}
      <div className="w-full px-4">
        <button
          onClick={() => setIsToolsOpen(!isToolsOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span className="text-xl font-medium">Tools</span>
          <span
            className={`transform transition-transform ${
              isToolsOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isToolsOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-2 mt-2 w-full">
            {modeButtons.map((button) => (
              <button
                key={button.label}
                onClick={() => changeMode(button.mode)}
                className={`flex items-center justify-center p-2 rounded ${
                  mode === button.mode
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {button.icon}
                <span className="ml-2">{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Icons Section */}
      <div className="w-full px-4">
        <button
          onClick={() => setIsIconsOpen(!isIconsOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span className="text-xl font-medium">Icons</span>
          <span
            className={`transform transition-transform ${
              isIconsOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isIconsOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
          />
          {renderIconGrid()}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen bg-black text-white w-full">
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
        className={`lg:hidden fixed top-0 left-0 h-screen w-full bg-black text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
          <button onClick={toggleSidebar} className="text-white">
            <FaIcons.FaTimes className="text-2xl" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
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
