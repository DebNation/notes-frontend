import { useContext } from "react";
import ThemeContext from "./contexts/themeContext";
import Index from "./comps/index";
import Navbar from "./comps/navbar";

function App() {
  const context = useContext(ThemeContext);
  const html = document.getElementById("html");
  if (context?.theme === "dark") {
    html?.classList.add("dark");
  } else {
    html?.classList.remove("dark");
  }
 
  return (
    <>
      <Navbar/>
      <Index />
    </>
  );
}

export default App;
