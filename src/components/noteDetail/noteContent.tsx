import INotes from "../../types/notes.js";
import { ArrowLeft, Archive, Trash, ArchiveRestore } from "lucide-react";
import { showFormattedDate } from "../../utils/format.js";
import navigate from "../../utils/navigate.js";

export default function NoteContent({
  isMobile,
  note,
  notes,
  setNotes,
}: {
  isMobile: boolean;
  note: INotes;
  notes: INotes[];
  setNotes: (T: INotes[]) => void;
}) {
  function handleArchive(id: number | string) {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });

    setNotes(newNotes);
  }

  function handleDelete(id: number | string) {
    const newNotes = notes.filter((note) => note.id !== id);

    setNotes(newNotes);
    navigate("/");
  }
  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col gap-4">
      {isMobile && (
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft />
          <p>All notes</p>
        </button>
      )}
      <header className="flex flex-col gap-2">
        <p className="text-sm text-neutral-400">
          {showFormattedDate(note.createdAt)}
        </p>
        <h1 className="text-2xl font-bold">{note.title}</h1>
      </header>
      <div className="flex gap-2">
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-800 px-4 py-2 hover:bg-neutral-800"
          onClick={() => handleArchive(note.id)}
        >
          {!note.archived ? (
            <>
              <Archive size={20} />
              Archive
            </>
          ) : (
            <>
              <ArchiveRestore size={20} />
              Unarchive
            </>
          )}
        </button>
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-800 p-2 hover:bg-neutral-800"
          onClick={() => handleDelete(note.id)}
        >
          <Trash size={20} />
        </button>
      </div>
      <p>{note.body}</p>
    </div>
  );
}
