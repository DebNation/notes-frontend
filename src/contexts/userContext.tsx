import { createContext } from "react";
type userLoginType = (token: string) => void;

type userContextType ={
    accessToken: string;
  userLogin: userLoginType;
  }
const UserContext = createContext<userContextType | undefined>(undefined)
export default UserContext;
