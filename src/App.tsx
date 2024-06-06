import { useContext } from "react";
import ThemeContext from "./contexts/themeContext";
import Index from "./comps/index";
import Navbar from "./comps/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./comps/about";
import React from "react";
import Register from "./comps/register";

function App() {
  const context = useContext(ThemeContext);

  const html = document.getElementById("html");
  if (context?.theme === "dark") {
    html?.classList.add("dark");
  } else {
    html?.classList.remove("dark");
  }
  const router = createBrowserRouter([
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Index />
        </>
      ),
    },
{
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },

  ]);

  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
