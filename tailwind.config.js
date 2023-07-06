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
        avatarLayout: "repeat(4, auto)",
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
