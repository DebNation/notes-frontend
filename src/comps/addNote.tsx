import { useContext, useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { addNoteFn } from "../api/api";
import UserContext from "../contexts/userContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const AddNote = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const user = useContext(UserContext);

  
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    mutationFn: async () => {
      if (user?.accessToken) {
        const response = await addNoteFn(user.accessToken, title, desc);
        console.log(response);
        setOpenModal(!openModal);
        setTitle("");
        setDesc("");
        return response;
      }
    },
  });
 

  return (
    <div className="flex justify-center items-center">
      <div className="">
        <button
          className="px-8 py-3 m-5 bg-yellow-600 text-sm rounded-md dark:hover:px-10 duration-300 "
          onClick={() => setOpenModal(!openModal)}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
        {openModal ? (
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm duration-100 animate-pop-up" id="modal" >
            <div className=" text-xl w-full h-screen flex justify-center p-5">
              <div className="bg-blend-saturation rounded-md bg-neutral-800 md:w-2/4  h-5/6 sm:5/6 md:h-4/6  w-full  md:3/4 p-5 ">
                <div className="flex justify-center text-xl pt-5">
                  <h1 className="">Add Note</h1>
                </div>
                <div>
                  <label className="block mt-2">Title</label>
                  <input
                    className="block mt-2 w-full bg-zinc-700 p-3 rounded-md border-2 border-lime-800"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div>
                  <label className="block mt-2"> Description</label>
                  <textarea
                    className="block mt-2 w-full bg-zinc-700 border-2 p-3 rounded-md border-lime-800"
                    rows={14}
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  />
                </div>
                <div className="flex justify-center p-5 md:p-10">
                  <button
                    className="px-5 py-2 bg-yellow-900 hover:bg-yellow-700 duration-300 rounded-md mt-2"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className="px-5 py-2 bg-green-900 hover:bg-green-700 duration-300 rounded-md mt-2 mx-5"
                    onClick={() => mutate()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AddNote;
