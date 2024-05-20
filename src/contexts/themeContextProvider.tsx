import { useState } from "react";
import ThemeContext from "./themeContext";
import { ThemeContextProviderType,} from "../@types/themeContextTypes";

const ThemeContextProvider = ({ children }: ThemeContextProviderType) => {
  const [theme, setTheme] = useState<string>("dark-mode")

  const toggleTheme = () => {
    if (theme === 'dark-mode') {
      setTheme("light-mode")
    }
    else {
      setTheme("dark-mode")

    }
  }
  return (

    <ThemeContext.Provider value={{ toggleTheme, theme } }>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;
