import { createContext } from "react";
type userLoginType = (token: string) => void;

type userContextType = {
  accessToken: string;
  userLogin: userLoginType;
  showLoading: boolean;
};
const UserContext = createContext<userContextType | undefined>(undefined);
export default UserContext;
