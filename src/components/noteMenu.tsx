import React from "react";
import INotes from "../types/notes.js";
import navigate from "../utils/navigate.js";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TABS, MAX_TITLE_LENGTH } from "../utils/constant.js";
import { showFormattedDate, capitalize } from "../utils/format.js";

function filterNotes(notes: INotes[], tab: string, searchKey?: string) {
  const q = searchKey?.toLocaleLowerCase();

  return notes.filter((note) => {
    const matchesTab =
      tab === TABS[0] ||
      (tab === TABS[1] && !note.archived) ||
      (tab === TABS[2] && note.archived);

    const matchesSearchKey = !q || note.title.toLocaleLowerCase().includes(q);

    return matchesTab && matchesSearchKey;
  });
}

function NoteMenu({
  notes,
  setNotes,
  params,
  isMobile,
}: {
  notes: INotes[];
  setNotes: React.Dispatch<React.SetStateAction<INotes[]>>;
  params: string | null;
  isMobile: boolean;
}) {
  const [filter, setFilter] = useState<string>("all");
  const [isAddNote, setIsAddNote] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <section
      className={`col-span-full flex h-dvh flex-col gap-4 overflow-auto p-4 transition-all duration-300 md:col-span-4 xl:col-span-3 ${!isMobile && "pe-3"}`}
    >
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ReactNotes✏️</h1>
        <button
          onClick={() => setIsAddNote(!isAddNote)}
          className="cursor-pointer rounded-lg bg-neutral-800 p-2 hover:bg-neutral-700"
        >
          {isAddNote ? <X size={20} /> : <Plus size={20} />}
        </button>
      </header>
      {isAddNote && <AddForm notes={notes} setNotes={setNotes} />}
      <div className="flex gap-2">
        <Tab filter={filter} setFilter={setFilter} />
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-neutral-900 p-2 has-[:focus-within]:outline has-[:focus-within]:outline-1 has-[:focus-within]:outline-offset-2 has-[:focus-within]:outline-neutral-200">
        <input
          type="text"
          placeholder="Search title..."
          className="w-full bg-transparent focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <X
            size={20}
            className="cursor-pointer text-neutral-400"
            onClick={() => setSearch("")}
          />
        )}
      </div>
      <div className="overflow-clip rounded-lg bg-neutral-900">
        <NoteCard
          notes={notes}
          filter={filter}
          searchKey={search}
          params={params}
        />
      </div>
    </section>
  );
}

function AddForm({
  notes,
  setNotes,
}: {
  notes: INotes[];
  setNotes: React.Dispatch<React.SetStateAction<INotes[]>>;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 50) {
      return;
    }
    setTitle(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newNote: INotes = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setBody("");
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="title" className="text-neutral-400">
            Title
          </label>
          <p className="text-sm text-neutral-400">{`${title.length}/${MAX_TITLE_LENGTH}`}</p>
        </div>
        <input
          id="title"
          type="text"
          value={title}
          onInput={handleTitleChange}
          className={`w-full rounded-lg bg-neutral-800 p-2 ${title.length >= MAX_TITLE_LENGTH && "outline-none focus-visible:outline-1 focus-visible:outline-red-800"}`}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="body" className="text-neutral-400">
          Body
        </label>
        <textarea
          id="body"
          placeholder="Explain your thoughts..."
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full resize-none rounded-lg bg-neutral-800 p-2"
        />
      </div>
      <button
        className="rounded-lg bg-neutral-200 p-2 font-medium text-neutral-800 hover:bg-neutral-300 disabled:bg-neutral-500"
        disabled={title.length === 0 || body.length === 0}
      >
        Add note
      </button>
    </form>
  );
}

function Tab({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  return TABS.map((tab) => (
    <div
      key={tab}
      className={`rounded-lg px-2 py-1 hover:cursor-pointer ${filter === tab.toLocaleLowerCase() ? "bg-neutral-200 text-neutral-800" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}
      onClick={() => setFilter(tab.toLocaleLowerCase())}
    >
      <p className="font-medium">{capitalize(tab)}</p>
    </div>
  ));
}

function NoteCard({
  notes,
  filter,
  searchKey,
  params,
}: {
  notes: INotes[];
  filter: string;
  searchKey?: string;
  params: string | null;
}) {
  const filteredNotes = filterNotes(notes, filter, searchKey);

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col p-4">
        <h2 className="font-medium">Nothing here</h2>
        <p className="text-neutral-400">
          It seems there are no notes that fit your search criteria. Maybe try a
          different search term or create a new note to get started.
        </p>
      </div>
    );
  }

  return filteredNotes.map((note) => (
    <article
      key={note.id}
      onClick={() => navigate(`/?note_id=${note.id}`)}
      className={`flex flex-col border-b border-neutral-800 p-4 last:border-b-0 hover:cursor-pointer hover:bg-neutral-800/50 ${note.id.toString() === params && "bg-neutral-800/50"}`}
    >
      <h2 className="line-clamp-1 text-neutral-400">{note.title}</h2>
      <p className="line-clamp-2 font-medium">{note.body}</p>
      <div className="mt-2 flex items-center justify-between">
        <NoteStatus isArchived={note.archived} />
        <p className="text-sm text-neutral-400">
          {showFormattedDate(note.createdAt)}
        </p>
      </div>
    </article>
  ));
}

function NoteStatus({ isArchived }: { isArchived: boolean }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-neutral-800 px-2 py-1 text-sm">
      {" "}
      <div
        className={`h-2 w-2 rounded-full ${isArchived ? "bg-yellow-800" : "bg-green-800"}`}
      ></div>
      {isArchived ? "Archived" : "Active"}
    </span>
  );
}

export default React.memo(NoteMenu);
