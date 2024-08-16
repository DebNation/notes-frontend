import { ReactNode, useContext } from "react";
import UserContext from "../contexts/userContext";
import Login from "./login";
import Notes from "./notes";
import { BoltIcon } from "@heroicons/react/16/solid";

export const Homepage = (): ReactNode => {
  const userContext = useContext(UserContext);
  return (
    //TODO: fix the light theme pages
    <div className="sm:h-screen dark:bg-everforest_bg0 h-screen bg-lime-200 dark:text-white">
      {userContext?.showLoading ? (
        <div className="dark:bg-everforest_bg0 h-screen items-center justify-center flex pt-5">
          <BoltIcon className="h-10 w-10 animate-pulse duration-75 fill-green-700" />
        </div>
      ) : userContext?.accessToken ? (
        <>
          <Notes />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Homepage;
