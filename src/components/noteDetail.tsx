import React from "react";
import navigate from "../utils/navigate.js";
import INotes from "../types/notes.js";
import { ArrowLeft, Archive, Trash, ArchiveRestore } from "lucide-react";
import { showFormattedDate } from "../utils/format.js";

function NoteDetail({
  params,
  isMobile,
  notes,
  setNotes,
}: {
  params: string | null;
  isMobile: boolean;
  notes: INotes[];
  setNotes: React.Dispatch<React.SetStateAction<INotes[]>>;
}) {
  const note = notes.find((note) => note.id.toString() === params);

  return (
    <section
      className={`col-span-full flex flex-col gap-4 rounded-lg bg-neutral-900 p-4 md:col-span-8 xl:col-span-9 ${!isMobile && "m-2"}`}
    >
      {!note ? (
        <InvalidParams params={params ?? ""} />
      ) : params ? (
        <NoteContent
          isMobile={isMobile}
          note={note}
          notes={notes}
          setNotes={setNotes}
        />
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

function InvalidParams({ params }: { params: string }) {
  return (
    <div className="m-auto flex max-w-96 flex-col gap-2 text-center">
      <h2 className="text-2xl font-medium">No note found</h2>
      <p className="text-neutral-400">
        It seems there is no note with the id {params}. Maybe try a different id
        or create a new note to get started.
      </p>
    </div>
  );
}

function NoteContent({
  isMobile,
  note,
  notes,
  setNotes,
}: {
  isMobile: boolean;
  note: INotes;
  notes: INotes[];
  setNotes: React.Dispatch<React.SetStateAction<INotes[]>>;
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

function EmptyState() {
  return (
    <div className="m-auto flex max-w-96 flex-col gap-2 text-center">
      <h2 className="text-2xl font-medium">Access your notes</h2>
      <p className="text-neutral-400">
        Simply click on the notes to view them. Your notes will appear here.
      </p>
    </div>
  );
}

export default React.memo(NoteDetail);
