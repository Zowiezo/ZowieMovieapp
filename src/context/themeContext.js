import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { saveTheme, getTheme } from "../utils/helper.js";

const ThemeContext = createContext({
  showThemeOptions: false,
  openMenu: () => {},
  closeMenu: () => {},
  setTheme: () => {},
  theme: "",
  setShowThemeOptions: () => {},
  checkSystemTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [theme, setTheme] = useState(getTheme() || "Light");

  // Function to check system theme and apply it
  const checkSystemTheme = useCallback(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "Dark" : "Light");
  }, []);

  // Check system theme on initial load
  useEffect(() => {
    checkSystemTheme(); // Ensure system theme is checked on initial load
  }, [checkSystemTheme]);

  // Apply the theme to the document (HTML) tag and save it to localStorage
  useEffect(() => {
    console.log("Current theme:", theme); // Check theme state
    document.documentElement.classList.toggle("dark", theme === "Dark");
    saveTheme(theme);
  }, [theme]);

  const openMenu = useCallback(() => {
    setShowThemeOptions(true);
  }, []);

  const closeMenu = useCallback(() => {
    setShowThemeOptions(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        showThemeOptions,
        openMenu,
        closeMenu,
        setTheme,
        theme,
        setShowThemeOptions,
        checkSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
