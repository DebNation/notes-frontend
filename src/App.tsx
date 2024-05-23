import { useContext } from "react";
import Login from "./comps/login";
import ThemeContext from "./contexts/themeContext";
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
    <div>
      <Navbar />
      <Login />
    </div>
  );
}

export default App;
