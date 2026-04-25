import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;