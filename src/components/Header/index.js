import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import throttle from "lodash.throttle";
import Logo from "../Logo/index.js";
import ThemeMenu from "../../components/ThemeMenu/index.js";
import HeaderNavItem from "./HeaderNavItem.js";
import { useGlobalContext } from "../../context/globalContext.js";
import { useTheme } from "../../context/themeContext.js";
import { maxWidth, textColor } from "../../styles/index.js";
import { navLinks } from "../../constants/index.js";
import { THROTTLE_DELAY } from "../../utils/config.js";
import { cn } from "../../utils/helper.js";

const Header = () => {
  const { openMenu, theme, showThemeOptions } = useTheme();
  const { setShowSidebar } = useGlobalContext();
  const [isActive, setIsActive] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const location = useLocation();
  const navigate = useNavigate(); // Used for programmatic navigation

  // Handle scroll for background color change
  useEffect(() => {
    const handleBackgroundChange = () => {
      const body = document.body;
      if (
        window.scrollY > 0 ||
        (body.classList.contains("no-scroll") &&
          parseFloat(body.style.top) * -1 > 0)
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const throttledHandleBackgroundChange = throttle(
      handleBackgroundChange,
      THROTTLE_DELAY
    );

    window.addEventListener("scroll", throttledHandleBackgroundChange);

    return () => {
      window.removeEventListener("scroll", throttledHandleBackgroundChange);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.split("/").length > 3) {
      setIsNotFoundPage(true);
    } else {
      setIsNotFoundPage(false);
    }
  }, [location.pathname]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmedSearchQuery = searchQuery.trim();

    if (trimmedSearchQuery) {
      // Navigate to the catalog page with the search query in the URL
      navigate(`/catalog?search=${trimmedSearchQuery}`);
    } else {
      // Show an alert or a message indicating the input is empty
      alert("Please search.");
    }
  };

  return (
    <header
      className={cn(
        `md:py-[16px] py-[14.5px] fixed top-0 left-0 w-full z-10 transition-all duration-50`,
        isActive && (theme === "Dark" ? "header-bg--dark" : "header-bg--light")
      )}
    >
      <nav
        className={cn(maxWidth, `flex justify-between flex-row items-center`)}
      >
        <Logo
          logoColor={cn(
            isNotFoundPage
              ? "text-black dark:text-primary"
              : !isNotFoundPage && isActive
              ? "text-black dark:text-primary"
              : "text-primary"
          )}
        />

        <div className="hidden md:flex flex-row gap-8 items-center text-gray-600 dark:text-gray-300">
          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg px-4 py-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Keywords..."
              className="bg-transparent text-black dark:text-white border-none outline-none"
              aria-label="Search for movies"
            />
            <button
              type="submit"
              className="text-gray-600 dark:text-gray-300"
              aria-label="Search"
            >
              🔍
            </button>
          </form>

          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link) => (
              <HeaderNavItem
                key={link.title}
                link={link}
                isNotFoundPage={isNotFoundPage}
                showBg={isActive}
              />
            ))}
          </ul>

          <div className="button relative">
            <button
              name="theme-menu"
              type="button"
              onClick={openMenu}
              id="theme"
              className={cn(
                `flex items-center justify-center mb-[2px] transition-all duration-100 hover:scale-110`,
                isNotFoundPage || isActive
                  ? ` ${textColor} dark:hover:text-secColor hover:text-black `
                  : ` dark:hover:text-secColor text-gray-300 `
              )}
            >
              {theme === "Dark" ? <BsMoonStarsFill /> : <FiSun />}
            </button>
            <AnimatePresence>
              {showThemeOptions && <ThemeMenu />}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          name="menu"
          className={cn(
            `inline-block text-[22.75px] md:hidden transition-all duration-300`,
            isNotFoundPage || isActive
              ? `${textColor} dark:hover:text-secColor hover:text-black `
              : ` dark:hover:text-secColor text-secColor`
          )}
          onClick={() => setShowSidebar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
