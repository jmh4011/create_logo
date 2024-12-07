import React, { useState, useEffect, useMemo, useCallback } from "react";
import useMode from "../../features/mode/useMode";
import iconMapping from "../../utils/iconMapping";

const Icons = () => {
  const { selectedIcon, setSelectedIcon } = useMode();
  const [isIconsOpen, setIsIconsOpen] = useState(false);
  const [displayedIcons, setDisplayedIcons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const ICONS_PER_PAGE = 24;

  const allIcons = useMemo(() => {
    return Object.entries(iconMapping).filter(([name]) =>
      /^(Fa|Ai|Bi|Bs|Cg|Di|Fi|Go|Gr|Hi|Im|Io|Md|Ri|Si|Ti|Vsc|Wi)/.test(name)
    );
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
        setDisplayedIcons((prev) => [...prev, ...iconsToDisplay]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  }, [isLoading, page, searchTerm, allIcons]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      if (!isLoading && scrollHeight - scrollTop <= clientHeight * 1.2) {
        loadMoreIcons();
      }
    },
    [loadMoreIcons, isLoading]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setPage(0);
      setDisplayedIcons([]);
      setTimeout(() => {
        loadMoreIcons();
      }, 300);
    },
    [loadMoreIcons]
  );

  const handleSelectIcon = (name) => {
    setSelectedIcon(name);
  };

  useEffect(() => {
    if (isIconsOpen && displayedIcons.length === 0) {
      loadMoreIcons();
    }
  }, [isIconsOpen, displayedIcons.length, loadMoreIcons]);
  return (
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
        <span
          className={`transform transition-transform duration-200 ${
            isIconsOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isIconsOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
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
          style={{ height: "300px" }}
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
                  ${
                    selectedIcon === name
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="text-2xl text-white" />
                  <span className="text-xs text-white mt-1 truncate w-full text-center">
                    {name.replace(
                      /^(Fa|Ai|Bi|Bs|Cg|Ci|Di|Fc|Fi|Gi|Go|Gr|Hi|Im|Io|Md|Ri|Si|Sl|Tb|Ti|Vsc|Wi)/,
                      ""
                    )}
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
};

export default Icons;
