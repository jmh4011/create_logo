import React, {
  useState,
  useEffect,
  useMemo,
} from "react";
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

const SideBar = () => {
  const { shapeIds, selectedShapeId, selectShape, removeShape } = useCanvas();
  const { mode, changeMode } = useMode();

  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [isIconsOpen, setIsIconsOpen] = useState(false);
  const [displayedIcons, setDisplayedIcons] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const ICONS_PER_PAGE = 32;

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
    if (searchTerm.trim() === "") return allIcons;
    return allIcons.filter(([name]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allIcons]);

  useEffect(() => {
    const endIdx = (page + 1) * ICONS_PER_PAGE;
    const newIcons = filteredIcons.slice(0, endIdx);
    setDisplayedIcons(newIcons);
  }, [page, filteredIcons]);

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
      className="h-80 overflow-y-auto"
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
          if (displayedIcons.length < filteredIcons.length) {
            setPage((prev) => prev + 1);
          }
        }
      }}
    >
      <div className="grid grid-cols-4 gap-2 mt-2 p-2">
        {displayedIcons.map(([name, Icon]) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
            onClick={() => {
              console.log(`Selected icon: ${name}`);
            }}
          >
            <Icon className="text-2xl text-white" />
            <span className="text-xs text-white mt-1 truncate w-full text-center">
              {name.replace(
                /^(Fa|Ai|Bi|Bs|Cg|Di|Fi|Go|Gr|Hi|Im|Io|Md|Ri|Si|Ti|Vsc|Wi)/,
                ""
              )}
            </span>
          </div>
        ))}
      </div>
      {displayedIcons.length < filteredIcons.length && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );

  const renderSidebarContent = () => (
    <div className="w-full">
      <div className="mt-4 w-full">
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
          <div className="overflow-y-auto overflow-x-hidden w-full h-80 border border-white mt-2">
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

      <div className="mt-4 w-full">
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
          <div className="grid grid-cols-2 gap-2 mt-2">
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

      <div className="mt-4 w-full">
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
      <div className="h-32 md:h-20 min-h-0 max-h-[60vh] flex flex-col items-start p-4 bg-black text-white">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-8 md:h-12 lg:h-16 w-auto" />
        </Link>

        <button
          className="mt-4 w-full bg-cyan-500 text-black font-medium px-4 py-2 rounded-lg hover:bg-cyan-600 transition md:block hidden"
          onClick={handleSaveClick}
        >
          <div className="flex items-center justify-center">
            <FaIcons.FaSave className="mr-2" />
            <span>Save Image</span>
          </div>
        </button>

        <button
          className="absolute right-4 top-4 bg-transparent text-white p-3 rounded-lg shadow-md md:hidden"
          onClick={toggleRightSidebar}
        >
          <FaIcons.FaBars className="text-xl" />
        </button>

        <div className="hidden md:block w-full">{renderSidebarContent()}</div>
      </div>

      <div
        className={`md:hidden fixed right-0 top-0 h-full w-full bg-black transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 pb-20">
          <button
            onClick={toggleRightSidebar}
            className="fixed top-4 right-4 text-white z-50 bg-gray-800 p-2 rounded"
          >
            <FaIcons.FaTimes />
          </button>
          <button
            className="w-full bg-cyan-500 text-black font-medium px-4 py-2 rounded-lg hover:bg-cyan-600 transition mt-12"
            onClick={handleSaveClick}
          >
            <div className="flex items-center justify-center">
              <FaIcons.FaSave className="mr-2" />
              <span>Save Image</span>
            </div>
          </button>
          <div className="mt-4">{renderSidebarContent()}</div>
        </div>
      </div>

      {showAdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-full max-h-full overflow-auto">
            <div className="p-4">
              <button
                onClick={() => setShowAdModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaIcons.FaTimes />
              </button>
              <div className="hidden md:block">
                <img
                  src="https://via.placeholder.com/728x90?text=Desktop+Ad+Demo+(728x90)"
                  alt="Desktop Ad"
                  className="w-full h-auto"
                />
              </div>
              <div className="md:hidden">
                <img
                  src="https://via.placeholder.com/320x100?text=Mobile+Ad+Demo+(320x100)"
                  alt="Mobile Ad"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
