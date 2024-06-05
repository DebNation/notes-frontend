import { NoteType } from "../@types/types";
import { useState, useContext } from "react";
import UserContext from "../contexts/userContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { DeleteNoteFn, updateNoteFn } from "../api/api";
import { TrashIcon } from "@heroicons/react/16/solid";

function NoteItem(props: NoteType) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const [id, setId] = useState(props.id);

  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const user = useContext(UserContext);

  const toggleConfirmUpdate = () => {
    if (confirm("Are You Sure!") === true) {
      setConfirmUpdate(true);
      mutate();
    }
  };
  const toggleConfirmDelete = () => {
    if (confirm("Are You Sure!") === true) {
      setConfirmDelete(true);
      mutate();
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    mutationFn: async () => {
      if (user?.accessToken && confirmUpdate) {
        const response = await updateNoteFn(user.accessToken, title, desc, id);
        console.log(response);
        // alert("Updated");
        setOpenModal(!openModal)
        return response;
      } else if (user?.accessToken && confirmDelete) {
        const response = await DeleteNoteFn(user.accessToken, id);
        console.log(response);
        setOpenModal(!openModal);
        alert("Deleted");
        return response;
      }
    },
  });

  return (
    <>
      <li
        className="break-inside mb-4 list-group-item  mx-1 md:mx-1 rounded-md bg-green-300 dark:bg-everforest_bg0 border-2 dark:hover:bg-everforest_bg_green border-everforest_green hover:border-everforest_green md:basis-1/4 md:flex-1 hover: cursor-pointer  transition duration-500 ease-in-out"
        onClick={() => setOpenModal(!openModal)}
      >
        <div className="m-2 p-2">
          <div className="break-words text-xl font-semibold">
            {props.title.length > 50
              ? props.title.slice(0, 50) + "..."
              : props.title}
          </div>

          <div className="break-words">
            {props.desc.length > 500
              ? props.desc.slice(0, 500) + "..."
              : props.desc}
          </div>
        </div>
      </li>

      {openModal ? (
        <div className="flex justify-center items-center">
          <div
            className="fixed inset-0 bg-opacity-30 backdrop-blur-md duration-100 animate-pop-up"
            id="modal"
          >
            <div className=" w-full h-screen flex justify-center p-5">
              <div className="bg-blend-saturation rounded-md bg-neutral-800 md:w-2/4  h-5/6 sm:5/6 md:h-4/6  w-full  md:3/4 p-5  ">
                <div className="flex justify-center text-xl pt-5">
                  <h1 className="">Update Note</h1>
                </div>
                <div>
                  <label className="block mt-2 text-xl">Title</label>
                  <textarea
                    className="block mt-2 w-full bg-zinc-700 p-3 rounded-md border-2 border-lime-800"
                    rows={2}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div>
                  <label className="block mt-2 text-xl"> Description</label>
                  <textarea
                    className="block mt-2 w-full bg-zinc-700 border-2 p-3 rounded-md border-lime-800"
                    rows={14}
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  />
                </div>
                <div className="flex justify-center p-5 md:p-10">
                  <button
                    className="px-5 py-2 bg-yellow-900 hover:bg-yellow-700 duration-300 rounded-md mt-2 mx-5"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className="px-5 py-2 bg-green-900 hover:bg-green-700 duration-300 rounded-md mt-2 mx-5"
                    onClick={() => toggleConfirmUpdate()}
                  >
                    Submit
                  </button>
                </div>
                <div className="flex justify-center mt-5">
                  <TrashIcon
                    className="h-8 w-8 text-rose-600"
                    onClick={() => toggleConfirmDelete()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default NoteItem;
