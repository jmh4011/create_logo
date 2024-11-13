import { useState } from "react";

const useDetailMenu = () => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const openDetailMenu = (event, id) => {
    event.preventDefault();
    setSelectedId(id);
    setMenuPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const closeDetailMenu = () => {
    setMenuPosition(null);
    setSelectedId(null);
  };

  return {
    menuPosition,
    selectedId,
    openDetailMenu,
    closeDetailMenu,
  };
};

export default useDetailMenu;
