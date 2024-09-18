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
      <header className="flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            {showFormattedDate(note.createdAt)}
          </p>
          <span className="flex">
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl hover:bg-neutral-800"
              onClick={() => handleArchive(note.id)}
            >
              {!note.archived ? (
                <Archive size={18} />
              ) : (
                <ArchiveRestore size={18} />
              )}
            </button>
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl hover:bg-neutral-800"
              onClick={() => handleDelete(note.id)}
            >
              <Trash size={18} />
            </button>
          </span>
        </div>
        <h1 className="text-2xl font-bold">{note.title}</h1>
      </header>
      <p>{note.body}</p>
    </div>
  );
}
