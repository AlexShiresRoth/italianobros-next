/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1225px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#ceb862",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // garamond: ["Cormorant Garamond", "Garamond", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
