module.exports = {
  darkMode: "class",
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Amiri", "serif"],
        sans: ["Merriweather", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        "light-beige": "#F9F5F0",
        "dark-beige": "#F0EDE7",
        "dark-gray": "#333333",
        "light-blue": "#A4DDEE",
        "dark-blue": "#91C0CF",
        "pastel-green": "#D4EBD0",
        "dark-green": "#4B6C4C",
      },
    },
  },
  plugins: [],
};
