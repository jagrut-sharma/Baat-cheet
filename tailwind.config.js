/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        lg: "940px",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Pacifico: ["Pacifico", "cursive"],
        OpenSans: ["Open Sans", "sans-serif"],
      },
      gridTemplateRows: {
        rootLayout: "auto 1fr",
        outlet: "1fr",
        responsiveOutlet: "1fr auto",
      },
      gridTemplateColumns: {
        rootColLayout: "13rem 1fr 18rem",
        rootlgColLayout: "13rem 1fr",
        navVColLayout: "13rem 1fr 18rem",
        responsiveNavLayout: "auto 1fr auto",
        responsiveOutlet: "1fr",
      },
    },
  },
  plugins: [],
};
