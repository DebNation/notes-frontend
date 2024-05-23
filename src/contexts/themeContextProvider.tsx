import { useState } from "react";
import ThemeContext from "./themeContext";
import { ThemeContextProviderType } from "../@types/themeContextTypes";

const ThemeContextProvider = ({ children }: ThemeContextProviderType) => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light")
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark")
    }
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
