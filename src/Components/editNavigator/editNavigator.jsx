import React from "react";

const EditNavigator = ({ setMode }) => {
  return (
    <div>
      <button onClick={() => setMode("rectangle")}>Rectangle</button>
      <button onClick={() => setMode("circle")}>Circle</button>
      <button onClick={() => setMode("line")}>Line</button>
      <button onClick={() => setMode("text")}>text</button>
      <button onClick={() => setMode("move")}>Move Mode</button>
    </div>
  );
};

export default EditNavigator;
