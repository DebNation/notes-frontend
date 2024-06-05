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
} from "@heroicons/react/16/solid";
import UserContext from "../contexts/userContext";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);

  const user = useContext(UserContext);

  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" bg-lime-300 dark:bg-everforest_bg_dim   dark:text-white shadow-black duration-100 ">
      <div className="flex justify-between">
        <div className="text-xl p-2 mt-3 flex gap-5">
          <div className="font-bold pl-5">Notemy</div>
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
          <div className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md">
            <UserIcon className="h-9 w-9 transition duration-500 mr-2" />
            <div className="mt-2 font-bold">Profile</div>
          </div>
          <div className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md" onClick={()=>{
            localStorage.removeItem("accessToken")
            user?.userLogin(localStorage.getItem("accessToken") || "")
          }}>
            <ArrowRightStartOnRectangleIcon className="h-9 w-9 transition duration-500 mr-2" />
            <div className="mt-2 font-bold">Logout</div>
          </div>
          <div className="hidden md:px-3 md:py-2 md:mr-5 md:mt-1 md:flex md:hover:bg-green-800 md:duration-100 md:rounded-md ">
            <InformationCircleIcon className="h-9 w-9 transition duration-500 mr-2" />
            <div className="mt-2 font-bold">About</div>
          </div>
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
                Profile
              </li>
              <li className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-everforest_orage flex">
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-2" />
                Logout
              </li>
              <li className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-green-600 flex">
                <InformationCircleIcon className="h-6 w-6 mr-2" />
                About
              </li>
            </ul>
          ) : (
            <ul className="block ">
              <li className="px-5 py-3  mx-5 rounded-md  bg-lime-800 hover:bg-green-600 flex ">
                <UserIcon className="h-6 w-6 mr-2" />
                Login
              </li>
              <li className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-everforest_orage flex">
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-2" />
                Register
              </li>
              <li className="px-5 py-3 mt-5  mx-5 rounded-md bg-lime-800 hover:bg-green-600 flex">
                <InformationCircleIcon className="h-6 w-6 mr-2" />
                About
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
