import { FiSun } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { GoDeviceDesktop } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { TbMovie } from "react-icons/tb";
import { MdOutlineLiveTv } from "react-icons/md";

export const navLinks = [
  {
    title: "home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    title: "movies",
    path: "/movie",
    icon: TbMovie,
  },
  {
    title: "tv series",
    path: "/tv",
    icon: MdOutlineLiveTv,
  },
];

export const themeOptions = [
  {
    title: "Dark",
    icon: BsMoonStarsFill,
  },
  {
    title: "Light",
    icon: FiSun,
  },
  {
    title: "System",
    icon: GoDeviceDesktop,
  },
];

export const footerLinks = [
  "Home",
  "About Us",
  "FAQ",
  "Term of Services",
  "Privacy policy",
  "Contact Us",
];

export const sections = [
  {
    title: "Trending movies",
    category: "movie",
    type: "popular",
  },
  {
    title: "Top rated movies",
    category: "movie",
    type: "top_rated",
  },
  {
    title: "Trending series",
    category: "tv",
    type: "popular",
  },
  {
    title: "Top rated series",
    category: "tv",
    type: "top_rated",
  },
];
