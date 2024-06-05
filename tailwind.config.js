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
      keyframes: {
        bounceOnce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-30px)" },
          "60%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        bounceOnce: "bounceOnce 1s ease-out",
      },
    },
  },
  plugins: [],
};
