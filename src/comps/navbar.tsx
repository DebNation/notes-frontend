import { useContext, useState } from "react";
import ThemeContext from "../contexts/themeContext";
import {
  MoonIcon,
  SunIcon,
  Bars2Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";
import UserContext from "../contexts/userContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);

  const user = useContext(UserContext);

  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" bg-lime-300 dark:bg-everforest_bg_dim   dark:text-white shadow-black duration-100 ">
      <div className="flex justify-between">
        <div className="text-xl p-2 mt-3 flex gap-5">
          <Link to={"/"}>
            <div className="font-bold pl-5 cursor-pointer">Notemy</div>
          </Link>
        </div>

        <div className="p-2 mr-2 flex">
          {darkMode ? (
            <MoonIcon
              className="p-2 mt-2 h-12 w-12 transition duration-100 hover:text-gray-500"
              onClick={() => {
                themeContext?.toggleTheme();
                setDarkMode(!darkMode);
              }}
            />
          ) : (
            <SunIcon
              className=" p-2  mt-2 h-12 w-12 transition duration-100 hover:text-white"
              onClick={() => {
                themeContext?.toggleTheme();
                setDarkMode(!darkMode);
              }}
            />
          )}
          {showModal ? (
            <XMarkIcon
              className="h-14 w-14 mt-1 p-2 md:hidden active:rotate-180 active:duration-1000 active:animate-spin"
              onClick={() => setShowModal(!showModal)}
            />
          ) : (
            <Bars2Icon
              className="h-14 w-14 mt-1 p-2 md:hidden active:rotate-180 active:duration-1000 active:animate-spin"
              onClick={() => setShowModal(!showModal)}
            />
          )}
          {user?.accessToken ? (
            <>
              <div>
                <Link
                  to={"/"}
                  className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md"
                >
                  <HomeIcon className="h-9 w-9 transition duration-500 mr-2" />
                  <div className="mt-2 font-bold">Home</div>
                </Link>
              </div>

              <div className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md">
                <UserIcon className="h-9 w-9 transition duration-500 mr-2" />
                <div className="mt-2 font-bold">
                  {localStorage.getItem("username")}
                </div>
              </div>
              <div
                className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  user?.userLogin(
                    localStorage.getItem("accessToken") || "",
                    localStorage.getItem("username") || "",
                  );
                }}
              >
                <ArrowRightStartOnRectangleIcon className="h-9 w-9 transition duration-500 mr-2" />
                <div className="mt-2 font-bold">Logout</div>
              </div>
              <div className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md ">
                <Link to={"/about"} className="hidden md:flex">
                  <InformationCircleIcon className="h-9 w-9 transition duration-500 mr-2" />
                  <div className="mt-2 font-bold">About</div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link
                  to={"/"}
                  className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md"
                >
                  <UserIcon className="h-9 w-9 transition duration-500 mr-2" />
                  <div className="mt-2 font-bold">Login</div>
                </Link>
              </div>
              <div>
                <Link
                  to={"/register"}
                  className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md"
                >
                  <ArrowRightStartOnRectangleIcon className="h-9 w-9 transition duration-500 mr-2" />
                  <div className="mt-2 font-bold">Register</div>
                </Link>
              </div>
              <div className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md ">
                <Link to={"/about"} className="hidden md:flex">
                  <InformationCircleIcon className="h-9 w-9 transition duration-500 mr-2" />
                  <div className="mt-2 font-bold">About</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {showModal ? (
        <div
          className={`block py-5  md:hidden ${showModal ? "animate-drop-once" : "animate-bounce-up-once"}`}
        >
          {user?.accessToken ? (
            <ul className="block ">
              <li className="px-5 py-3  mx-5 rounded-md  bg-lime-800 hover:bg-green-600 flex ">
                <UserIcon className="h-6 w-6 mr-2" />
                {localStorage.getItem("username")}
              </li>
              <li
                className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-everforest_orage flex"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  user?.userLogin(
                    localStorage.getItem("accessToken") || "",
                    localStorage.getItem("username") || "",
                  );
                }}
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-2" />
                Logout
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-green-600 flex"
                >
                  <InformationCircleIcon className="h-6 w-6 mr-2" />
                  About
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="block ">
              <li>
                <Link
                  to={"/"}
                  className="px-5 py-3  mx-5 rounded-md  bg-lime-800 hover:bg-green-600 flex "
                >
                  <UserIcon className="h-6 w-6 mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-everforest_orage flex"
                >
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-2" />
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-green-600 flex"
                >
                  <InformationCircleIcon className="h-6 w-6 mr-2" />
                  About
                </Link>
              </li>
            </ul>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Navbar;
