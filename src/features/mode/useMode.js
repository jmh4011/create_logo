// features/mode/useMode.js

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  setMode as setModeReducer,
  setSelectedIcon as setSelectedIconReducer,
  resetMode as resetModeReducer,
} from "./modeSlice";

const useMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);
  const selectedIcon = useSelector((state) => state.mode.selectedIcon);

  const setMode = useCallback(
    (newMode) => {
      dispatch(setModeReducer(newMode));
    },
    [dispatch]
  );

  const setSelectedIcon = useCallback(
    (iconName) => {
      dispatch(setSelectedIconReducer(iconName));
    },
    [dispatch]
  );

  const resetMode = useCallback(() => {
    dispatch(resetModeReducer());
  }, [dispatch]);

  return { mode, selectedIcon, setMode, setSelectedIcon, resetMode };
};

export default useMode;
