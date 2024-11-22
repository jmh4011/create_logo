import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
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
  const scrollRef = useRef(null);
  const ICONS_PER_PAGE = 16;

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

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setPage((prev) => prev + 1);
      }
    }
  }, []);

  useEffect(() => {
    const startIdx = page * ICONS_PER_PAGE;
    const newIcons = filteredIcons.slice(0, startIdx + ICONS_PER_PAGE);
    setDisplayedIcons(newIcons);
  }, [page, filteredIcons]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); 
    setPage(0); 
    setDisplayedIcons(filteredIcons.slice(0, ICONS_PER_PAGE)); 
  };

  const handleDelete = () => {
    if (selectedShapeId !== undefined) {
      removeShape(selectedShapeId);
    } else {
      alert("No shape selected!");
    }
  };

  return (
    <div className="h-auto md:h-20 min-h-0 max-h-[80vh] flex flex-col items-start p-4 bg-black text-white">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-8 md:h-12 lg:h-16 w-auto" />
      </Link>

      <div className="mt-4 w-full">
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className="w-full flex justify-between items-center p-2 bg-gray-800 text-white rounded"
        >
          <span>Layers</span>
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
          <span>Tools</span>
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
          <div className="grid grid-cols-4 gap-2 mt-2 p-2 max-h-[300px] overflow-y-auto">
            {modeButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => changeMode(button.mode)}
                className="flex flex-col items-center justify-center p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <div className="text-2xl text-gray-200">{button.icon}</div>
                <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">
                  {button.label}
                </span>
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
          <span>Icons</span>
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
          <div className="p-2">
            <input
              type="text"
              placeholder="Search icons..."
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearchChange}
            />
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="grid grid-cols-4 gap-4 mt-2 p-2 max-h-[300px] overflow-y-auto"
          >
            {displayedIcons.map(([name, Icon], index) => (
              <button
                key={index}
                onClick={() => {
                  console.log(`Selected icon: ${name}`);
                }}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <Icon className="text-2xl text-gray-200" />
                <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">
                  {name.replace(/^(Fa|Ai|Bi)/, "")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
