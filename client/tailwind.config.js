/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // The key here ("sourGummy") becomes the class name "font-sourGummy"
        sourGummy: ["Sour Gummy", "sans-serif"],
        // Optionally add "geist": ["Geist", "sans-serif"],
      },
      colors: {
        earthyGreen: "#223030", // dark green
        earthyBrown: "#523D35", // deep brown
        earthySage: "#959D90", // sage/gray-green
        earthyTaupe: "#BBA58F", // taupe
        earthyCream: "#E8D9CD", // pinkish cream
        earthyOffWhite: "#EFEFE9", // off-white
      },
    },
  },
  plugins: [],
};
