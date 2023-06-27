import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

export default function ErrorPage() {
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
    <div className="grid min-h-[100dvh] grid-rows-rootLayout bg-gray-200 font-OpenSans dark:bg-gray-800 ">
      <Nav theme={theme} setTheme={setTheme} login />

      <main className="grid min-h-full place-items-center bg-gray-200 px-6 py-24 font-Poppins dark:bg-gray-800 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-Poppins text-4xl font-semibold text-blue-700 dark:text-blue-500">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-blue-600 dark:hover:bg-blue-400"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
