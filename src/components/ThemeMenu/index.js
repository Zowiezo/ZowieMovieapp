import React from "react";
import { m } from "framer-motion";
import { useTheme } from "../../context/themeContext.js";
import { themeOptions } from "../../constants/index.js";
import { textColor } from "../../styles/index.js";
import { useOnClickOutside } from "../../hooks/useOnClickOutside.js";
import { cn } from "../../utils/helper.js";
import { useMotion } from "../../hooks/useMotion.js";
import { useOnKeyPress } from "../../hooks/useOnKeyPress.js";

const ThemeMenu = () => {
  const { theme, setTheme, checkSystemTheme, setShowThemeOptions, closeMenu } =
    useTheme();
  const { zoomIn } = useMotion();

  const { ref } = useOnClickOutside({
    action: closeMenu,
  });

  useOnKeyPress({
    action: closeMenu,
    key: "Escape",
  });

  const themeStyles = {
    Light: {
      background: "#FAFAFA",
      hover: "hover:bg-gray-200",
    },
    Dark: {
      background: "rgba(0,0,0,0.7)",
      hover: "dark:hover:bg-black",
    },
  };

  const changeTheme = (selectedTheme) => {
    try {
      if (selectedTheme === "System") {
        checkSystemTheme();
      } else {
        setTheme(selectedTheme);
      }
      setShowThemeOptions(false);
    } catch (error) {
      console.error("Error changing theme:", error);
    }
  };

  return (
    <m.ul
      ref={ref}
      variants={zoomIn(0.9, 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      style={{
        background: themeStyles[theme]?.background || "#FFFFFF",
      }}
      className={`absolute top-[200%] right-[25%] bg-primary shadow-md backdrop-blur-sm rounded-md overflow-hidden ${
        theme === "Dark" ? "dark-glass" : "light-glass"
      }`}
      role="menu"
      aria-label="Theme options"
    >
      {themeOptions.map((option, index) => (
        <li
          key={index}
          className={cn(
            "transition-all duration-300",
            themeStyles[theme]?.hover,
            theme === option.title && "bg-gray-200 dark:bg-black"
          )}
        >
          <button
            name="theme"
            type="button"
            aria-pressed={theme === option.title}
            className={cn(
              "flex flex-row items-center gap-3 w-full font-medium py-2 px-4 text-[14px]",
              theme === option.title && textColor
            )}
            onClick={() => {
              changeTheme(option.title);
            }}
          >
            {<option.icon />}
            <span>{option.title}</span>
          </button>
        </li>
      ))}
    </m.ul>
  );
};

export default ThemeMenu;
