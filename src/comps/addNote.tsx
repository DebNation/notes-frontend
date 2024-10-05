import { ReactNode, useContext, useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { addNoteFn } from "../api/api";
import UserContext from "../contexts/userContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const AddNote = (): ReactNode => {
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
        toast.success("Note added")
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
          className="px-8 py-3 m-5 dark:bg-yellow-600 bg-everforest_orage text-sm rounded-md hover:px-10 duration-300 "
          onClick={() => setOpenModal(!openModal)}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
        {openModal ? (
          <div
            className="fixed inset-0 bg-opacity-30  backdrop-blur-sm duration-100 animate-pop-up "
            id="modal"
          >
            <div className=" text-xl w-full h-screen flex justify-center">
              <div className="container bg-blend-saturation rounded-md dark:bg-neutral-800 bg-lime-400 dark:text-white  w-full h-screen p-10 ">
                <div className="flex justify-center text-xl pt-5">
                  <h1 className="bold text-2xl">ADD NOTE</h1>
                </div>
                <div>
                  <label className="block mt-2">Title</label>
                  <input
                    className="block mt-2 w-full dark:bg-zinc-700 bg-zinc-300 hover:bg-white duration-500 p-3 rounded-md border-2 border-lime-800"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div>
                  <label className="block mt-2"> Description</label>
                  <textarea
                    className="block mt-2 w-full dark:bg-zinc-700  bg-zinc-300 hover:bg-white duration-500 border-2 p-3 rounded-md border-lime-800"
                    rows={20}
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  />
                </div>
                <div className="flex justify-center p-5 md:p-10 ">
                  <button
                    className="px-5 py-2 bg-yellow-900 hover:bg-yellow-700 duration-300 rounded-md mt-2 text-white"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className="px-5 py-2 bg-green-900 hover:bg-green-700 duration-300 rounded-md mt-2 mx-5 text-white"
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
