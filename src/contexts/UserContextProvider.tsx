import UserContext from "./userContext";
import { UserContextProviderType } from "../@types/themeContextTypes";
import { useEffect, useState } from "react";
import { getMeFn } from "../api/api";
import { getMeResponseType } from "../@types/types";

const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [accessToken, setAccessToken] = useState("")

  const userLogin = (newToken: string) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      if (token?.length > 1 && token !== null) {
        setAccessToken(token)
      }
    }
    else {
      // else no token found on localstorage set the newToken
      localStorage.setItem("accessToken", newToken)
      setAccessToken(newToken)


    }

  }
  useEffect(() => {
    (async () => {
      // get the accessToken everytime page renders to check user is loggedin
      const token = localStorage.getItem("accessToken");
      if (token) {

        if (token?.length > 1 && token !== null) {
          try {
            // Check the validity of the token 
            const data: getMeResponseType = await getMeFn(token);
            console.log(data.data.username)

            setAccessToken(token)

          }
          catch (err) {
            //remove the accessToken if it's expired or being tampered
            localStorage.removeItem("accessToken")
            console.log("unauth")

          }

        }
      }
    })();

  }, [accessToken])

  return (
    <UserContext.Provider value={{ accessToken, userLogin }}>
      {children}
    </UserContext.Provider>
  )


}

export default UserContextProvider;
