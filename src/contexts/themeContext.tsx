import { createContext } from "react";

type toggleThemeType = () => void;

interface ThemeContextType {
  toggleTheme: toggleThemeType;
  theme: string;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext;
