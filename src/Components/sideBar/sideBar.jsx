import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import * as CiIcons from "react-icons/ci";
import * as FcIcons from "react-icons/fc";
import * as GiIcons from "react-icons/gi";
import * as SlIcons from "react-icons/sl";
import * as TbIcons from "react-icons/tb";

const modeButtons = [
  { mode: null, icon: <FaIcons.FaMousePointer />, label: "Select" },
  { mode: "rectangle", icon: <FaIcons.FaSquare />, label: "Rectangle" },
  { mode: "circle", icon: <FaIcons.FaCircle />, label: "Circle" },
  { mode: "line", icon: <FaIcons.FaPen />, label: "Line" },
  { mode: "text", icon: <FaIcons.FaTextWidth />, label: "Text" },
];

const iconLibraries = {
  Fa: FaIcons,
  Ai: AiIcons,
  Bi: BiIcons,
  Bs: BsIcons,
  Cg: CgIcons,
  Di: DiIcons,
  Fi: FiIcons,
  Go: GoIcons,
  Gr: GrIcons,
  Hi: HiIcons,
  Im: ImIcons,
  Io: IoIcons,
  Md: MdIcons,
  Ri: RiIcons,
  Si: SiIcons,
  Ti: TiIcons,
  Vsc: VscIcons,
  Wi: WiIcons,
  Ci: CiIcons, 
  Fc: FcIcons,
  Gi: GiIcons, 
  Sl: SlIcons, 
  Tb: TbIcons,
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
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const ICONS_PER_PAGE = 24;

  const allIcons = useMemo(() => {
    const icons = [];
    Object.entries(iconLibraries).forEach(([prefix, library]) => {
      Object.entries(library).forEach(([name, component]) => {
        if (name.startsWith(prefix)) {
          icons.push([name, component]);
        }
      });
    });
    return icons;
  }, []);

  const loadMoreIcons = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    const start = page * ICONS_PER_PAGE;
    const filteredIcons = searchTerm.trim()
      ? allIcons.filter(([name]) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allIcons;

    const iconsToDisplay = filteredIcons.slice(start, start + ICONS_PER_PAGE);
    
    if (iconsToDisplay.length > 0) {
      setTimeout(() => {
        setDisplayedIcons(prev => [...prev, ...iconsToDisplay]);
        setPage(prev => prev + 1);
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  }, [isLoading, page, searchTerm, allIcons]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    
    if (!isLoading && (scrollHeight - scrollTop <= clientHeight * 1.2)) {
      loadMoreIcons();
    }
  }, [loadMoreIcons, isLoading]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(0);
    setDisplayedIcons([]);
    setTimeout(() => {
      loadMoreIcons();
    }, 300);
  }, [loadMoreIcons]);

  const handleSelectIcon = (name) => {
    console.log('Selected Icon:', name);
    setSelectedIcon(name);
    setMode('icon');
  };

  const renderIconsSection = () => (
    <div className="w-full px-4">
      <button
        onClick={() => {
          setIsIconsOpen(!isIconsOpen);
          if (!isIconsOpen && displayedIcons.length === 0) {
            loadMoreIcons();
          }
        }}
        className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded
          hover:bg-gray-700 transition-colors duration-200"
      >
        <span className="text-xl font-medium">Icons</span>
        <span className={`transform transition-transform duration-200 ${isIconsOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out ${
          isIconsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mt-2 bg-gray-800 text-white rounded
            border border-gray-700 focus:border-blue-500 focus:outline-none"
        />

        <div 
          className="relative mt-2 border border-gray-700 rounded bg-gray-900"
          style={{ height: '300px' }}
        >
          <div
            className="absolute inset-0 overflow-y-scroll scrollbar-thin 
              scrollbar-thumb-blue-500 scrollbar-track-gray-800
              hover:scrollbar-thumb-blue-400"
            onScroll={handleScroll}
          >
            <div className="grid grid-cols-4 gap-2 p-2">
              {displayedIcons.map(([name, Icon]) => (
                <div
                  key={name}
                  onClick={() => handleSelectIcon(name)}
                  className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer 
                    transition-colors duration-200
                    ${selectedIcon === name 
                      ? "bg-blue-600 hover:bg-blue-500" 
                      : "bg-gray-800 hover:bg-gray-700"}`}
                >
                  <Icon className="text-2xl text-white" />
                  <span className="text-xs text-white mt-1 truncate w-full text-center">
                  {name.replace(/^(Fa|Ai|Bi|Bs|Cg|Ci|Di|Fc|Fi|Gi|Go|Gr|Hi|Im|Io|Md|Ri|Si|Sl|Tb|Ti|Vsc|Wi)/, "")}
                  </span>
                </div>
              ))}
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center py-4 space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (isIconsOpen && displayedIcons.length === 0) {
      loadMoreIcons();
    }
  }, [isIconsOpen, displayedIcons.length, loadMoreIcons]);

  const deleteSelectedShape = () => {
    if (selectedShapeId !== undefined) {
      removeShape(selectedShapeId);
    } else {
      alert("No shape selected!");
    }
  };

  const renderSidebarContent = () => (
    <div className="w-full h-full flex flex-col space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
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
            onClick={deleteSelectedShape}
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
      {renderIconsSection()}
    </div>
  );

  const changeMode = (newMode) => {
    setMode(newMode);
    setSelectedIcon(null);
  };

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen bg-black text-white w-full 
        overflow-y-auto scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-800">
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
          <button 
            onClick={toggleSidebar} 
            className="text-white"
          >
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
          <button 
            onClick={toggleSidebar} 
            className="text-white"
          >
            <FaIcons.FaTimes className="text-2xl" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)] 
          scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600">
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
