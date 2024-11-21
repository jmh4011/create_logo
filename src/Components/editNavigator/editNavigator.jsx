import React from "react";
import useMode from "../../features/mode/useMode";

const EditNavigator = () => {
  const { changeMode } = useMode();
  return (
    <div className="bg-white">
      <button onClick={() => changeMode("rectangle")}>Rectangle</button>
      <button onClick={() => changeMode("circle")}>Circle</button>
      <button onClick={() => changeMode("line")}>Line</button>
      <button onClick={() => changeMode("text")}>text</button>
      <button onClick={() => changeMode("move")}>Move Mode</button>
    </div>
  );
};

export default EditNavigator;
