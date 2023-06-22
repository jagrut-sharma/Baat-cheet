import { useEffect, useState } from "react";

import Nav from "../components/Nav";
import NavSideBar from "../components/NavSideBar";
import RightSideBar from "../components/RightSideBar";
import { Outlet } from "react-router-dom";
import AutoScroll from "../components/AutoScroll";

export default function RootLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  //onMount theme check
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (theme === "dark" || (!theme && userPrefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Manual theme switcher:
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative grid min-h-[100dvh] grid-rows-rootLayout  scroll-smooth bg-gray-200 font-OpenSans dark:bg-gray-800">
      <Nav theme={theme} setTheme={setTheme} />
      <div className="relative grid grid-cols-responsiveOutlet grid-rows-responsiveOutlet md:grid-cols-rootlgColLayout md:grid-rows-outlet lg:grid-cols-rootColLayout">
        <NavSideBar />
        <AutoScroll />
        <Outlet />
        <RightSideBar />
      </div>
    </div>
  );
}
