// features/mode/useMode.js

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { setMode } from "./modeSlice";

const useMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const changeMode = useCallback(
    (newMode) => {
      dispatch(setMode(newMode));
    },
    [dispatch]
  );

  return { mode, changeMode };
};

export default useMode;
