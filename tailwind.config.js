/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        everforest_bg_dim: "#1e2326",
        everforest_bg_green: "#3c4841",
        everforest_green: "#a7c080",
        everforest_bg0: "#272e33",
        everforest_orage: "#e69875",
        everforest_bg_yellow: "#45443c",
        everforest_bg_red: "#4c3743",
      },
    },
  },
  plugins: [],
};
