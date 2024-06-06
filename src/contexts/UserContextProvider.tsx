import UserContext from "./userContext";
import { UserContextProviderType } from "../@types/themeContextTypes";
import { useEffect, useState } from "react";
import { getMeFn } from "../api/api";
// import { BoltIcon, ArrowPathIcon } from "@heroicons/react/16/solid";

const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [accessToken, setAccessToken] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const userLogin = (newToken: string, username: string) => {
    const token = localStorage.getItem("accessToken");
    const UserName = localStorage.getItem("username");

    if (token && UserName) {
      if (token?.length > 1 && token !== null) {
        setAccessToken(token);
      }
    } else {
      // else no token found on localstorage set the newToken
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("username", username);
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
            await getMeFn(token);
            //TODO use a usecallback to prevent re-render

            setAccessToken(token);
          } catch (err) {
            //remove the accessToken if it's expired or being tampered
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            console.log("unauth");
          }
        }
      }
      setShowLoading(false);
    })();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{ accessToken, userLogin, showLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
