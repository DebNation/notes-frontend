import UserContext from "./userContext";
import { UserContextProviderType } from "../@types/themeContextTypes";
import { useEffect, useState } from "react";
import { getMeFn } from "../api/api";
import { getMeResponseType } from "../@types/types";
import { BoltIcon, ArrowPathIcon } from "@heroicons/react/16/solid";

const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [accessToken, setAccessToken] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const userLogin = (newToken: string) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (token?.length > 1 && token !== null) {
        setAccessToken(token);
      }
    } else {
      // else no token found on localstorage set the newToken
      localStorage.setItem("accessToken", newToken);
      setAccessToken(newToken);
    }
  };
  useEffect(() => {
    (async () => {
      setShowLoading(true);
      // get the accessToken everytime page renders to check user is loggedin
      const token = localStorage.getItem("accessToken");
      if (token) {
        if (token?.length > 1 && token !== null) {
          try {
            // Check the validity of the token
            const data: getMeResponseType = await getMeFn(token);
            console.log(data.data.username);
            //TODO use a usecallback to prevent re-render

            setAccessToken(token);
          } catch (err) {
            //remove the accessToken if it's expired or being tampered
            localStorage.removeItem("accessToken");
            console.log("unauth");
          }
        }
      }
      setShowLoading(false);
    })();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ accessToken, userLogin }}>
      {showLoading ? (
        <div className="h-screen items-center justify-center flex dark:bg-neutral-800 dark:text-white ">
          <BoltIcon className="h-10 w-10 animate-pulse duration-75 fill-green-700" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
