import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill, BsSearch } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Nav({ theme, setTheme }) {
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
  };

  return (
    <header className=" sticky top-0 z-10 grid grid-cols-responsiveNavLayout items-center gap-x-[10px] border-b border-slate-300 bg-gray-200 shadow dark:border-gray-600 dark:bg-gray-800 md:grid-cols-navVColLayout">
      <Link to={"/"} className="flex items-center pl-2">
        <Logo />

        <h1 className="hidden p-4 pl-2 font-Pacifico text-3xl font-bold text-blue-600 dark:text-white md:block">
          Baat-cheet
        </h1>
      </Link>

      <form
        className="flex  justify-self-center rounded-3xl border border-stone-400 p-1 focus-within:border-blue-400"
        onSubmit={handleSearchForm}
      >
        <button
          htmlFor="search"
          className="cursor-pointer rounded-full bg-blue-600 p-2"
        >
          <BsSearch size={"1rem"} />
        </button>
        <input
          type="search"
          name=""
          id="search"
          placeholder="Search users"
          className="bg-transparent p-1 focus-visible:outline-none dark:text-slate-50"
        />
      </form>

      <div className="mr-2 flex h-full items-center justify-self-end py-4 pr-2 sm:hidden">
        <button onClick={handleThemeSwitch}>
          {theme === "dark" ? (
            <FaSun size={"1.3rem"} color="#f59e0b" />
          ) : (
            <BsFillMoonStarsFill size={"1.3rem"} color="#eab308" />
          )}
        </button>
      </div>

      <div className="hidden justify-self-end sm:block sm:p-4">
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
