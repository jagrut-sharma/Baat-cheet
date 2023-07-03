import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

// eslint-disable-next-line react/prop-types
export default function Nav({ theme, setTheme, login }) {
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className=" sticky top-0 z-10 grid grid-cols-responsiveNavLayout items-center gap-x-[10px] border-b border-slate-300 bg-gray-200 shadow dark:border-gray-600 dark:bg-gray-800 md:grid-cols-navVColLayout">
      <Link to={"/"} className="flex items-center pl-2">
        <Logo />

        <h1 className="hidden p-4 pl-2 font-Pacifico text-3xl font-bold text-blue-600 dark:text-white md:block">
          Baat-cheet
        </h1>
      </Link>

      {!login && <SearchBar />}

      <div className="col-start-3 mr-2 flex h-full items-center justify-self-end py-4 pr-2 sm:hidden">
        <button onClick={handleThemeSwitch}>
          {theme === "dark" ? (
            <FaSun size={"1.3rem"} color="#f59e0b" />
          ) : (
            <BsFillMoonStarsFill size={"1.3rem"} color="#eab308" />
          )}
        </button>
      </div>

      <div className="col-start-3 hidden justify-self-end sm:block sm:p-4">
        <Switch
          checked={theme === "dark"}
          onChange={handleThemeSwitch}
          className={`${theme === "dark" ? "bg-blue-800" : "bg-blue-600"}
    relative inline-flex h-[1.75rem] w-[62px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${theme === "dark" ? "translate-x-8" : "translate-x-0"}
      pointer-events-none inline-flex h-[1.5rem] w-[1.5rem] transform items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          >
            {theme === "dark" ? (
              <BsFillMoonStarsFill color="#fbbf24" />
            ) : (
              <FaSun color="#d97706" />
            )}
          </span>
        </Switch>
      </div>
    </header>
  );
}
