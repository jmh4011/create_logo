import React from "react";

const EditNavigator = ({ setMode }) => {
  return (
    <div>
      <button onClick={() => setMode("rectangle")}>Rectangle</button>
      <button onClick={() => setMode("circle")}>Circle</button>
      <button onClick={() => setMode("line")}>Line</button>
      <button onClick={() => setMode("textBoxType1")}>text box type1</button>
      <button onClick={() => setMode("textBoxType2")}>text box type2</button>
      <button onClick={() => setMode("move")}>Move Mode</button>
    </div>
  );
};

export default EditNavigator;
