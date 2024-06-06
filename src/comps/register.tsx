import { useState } from "react";
// import { useContext } from "react";
// import UserContext from "../contexts/userContext";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { RegisterFn } from "../api/api";
import { registerResponseType } from "../@types/types";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);

  const navigate = useNavigate();

  // const user = useContext(UserContext);

  const userData = { username: username, email: email, password: password };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowProcessing(true);
    try {
      const data: registerResponseType = await RegisterFn(userData);
      alert("Account is Created, You can Login Now");

      navigate("/");
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 409) {
        console.log("User already exist");
      }
    }
    setShowProcessing(false);
  };

  return (
    <div className="h-screen items-center justify-center flex dark:bg-everforest_bg0 dark:text-white duration-100">
      {showProcessing ? (
        <ArrowPathIcon className="animate-spin h-6 w-6" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border-2 rounded-md p-5 w-3/4  md:w-1/4 lg:w-1/4 shadow-black border-black dark:border-gray-300 h-2/8"
        >
          <div className=" inline-block text-center p-5 w-full">
            <h1 className="text-3xl mb-1">Register</h1>
            <hr />
          </div>

          <div className=" block ">
            <label className="block">Username</label>
            <input
              className="p-2 mt-1 w-full border-2 hover:border-black dark:border-neutral-600 dark:border-2 dark:bg-neutral-600"
              required={true}
              placeholder="demouser"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=" block mt-5 h-2/4 ">
            <label className="block">Email</label>
            <input
              className="p-2 mt-1 w-full border-2 hover:border-black dark:border-neutral-600 dark:border-2 dark:bg-neutral-600 "
              placeholder="demouser@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="block mt-5 h-2/4">
            <label className="block">Password</label>
            <input
              className="p-2 mt-1 w-full border-2 hover:border-black dark:border-neutral-600 dark:border-2 dark:bg-neutral-600 "
              placeholder="*********"
              required={true}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="justify-center flex mt-5">
              <button
                type="submit"
                className="px-5 py-2 rounded border-2 mt-3 hover:border-black"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
export default Register;
