import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getAllNotes } from "../api/api";
import UserContext from "../contexts/userContext";
import Noteitem from "./noteitem";
import { BoltIcon } from "@heroicons/react/16/solid";
import AddNote from "./addNote";

interface NoteType {
  id: number;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
const Notes = () => {
  const user = useContext(UserContext);

  const { data, isPending, isRefetchError, isError } = useQuery({
    queryKey: ["notes", user?.accessToken],
    queryFn: async () => {
      if (user?.accessToken) {
        try{
const response = await getAllNotes(user?.accessToken);
        console.log(isRefetchError);
        console.log(isError);
        console.log(isPending)
        console.log(response)
        return response.data;

        }
        catch(err){
          console.log("error catched")
          window.location.reload()
        }
                
      }
    },
  });

  return (
    <div className="bg-lime-200 dark:bg-everforest_bg0 dark:text-white mx-2 pt-2 sm:h-screen ">
        <AddNote />

        {!isPending && data && !isRefetchError && !isError ? (
          <ul className="masonry sm:masonry-sm md:masonry-md mx-2">
            {[...data].reverse().map((note: NoteType) => {
              return (
                <Noteitem
                  id={note.id}
                  title={note.title}
                  desc={note.desc}
                  createdAt={note.createdAt}
                  updatedAt={note.updatedAt}
                  userId={note.userId}
                  key={note.id}
                />
              );
            })}
          </ul>
        ) : (
          <div className="items-center justify-center flex h-screen">
            <BoltIcon className="h-10 w-10 animate-pulse duration-75 fill-green-700" />
          </div>
        )}
    </div>
  );
};

export default Notes;
