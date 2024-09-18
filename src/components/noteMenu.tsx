import React from "react";
import INotes from "../types/notes.js";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TABS } from "../utils/constant.js";
import { capitalize } from "../utils/format.js";
import Tab from "./noteMenu/tab.js";
import AddForm from "./noteMenu/addForm.js";
import Search from "./noteMenu/search.js";
import NoteCard from "./noteMenu/note.js";
import EmptyNote from "./noteMenu/emptyNote.js";
import { useLocalStorage } from "../utils/hooks.js";

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
  params,
  isMobile,
}: {
  params: string | null;
  isMobile: boolean;
}) {
  const [notes, setNotes] = useLocalStorage<INotes[]>("notes", []);
  const [filter, setFilter] = useState<string>("all");
  const [isAddNote, setIsAddNote] = useState(false);
  const [search, setSearch] = useState("");

  function handleTabClick(tab: string) {
    setFilter(tab);
  }

  const filteredNotes = filterNotes(notes, filter, search);

  return (
    <aside
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
        {TABS.map((tab) => (
          <Tab
            key={tab}
            variant={tab === filter ? "active" : "default"}
            onClick={() => handleTabClick(tab)}
          >
            <p className="font-medium">{capitalize(tab)}</p>
          </Tab>
        ))}
      </div>
      <Search>
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
      </Search>
      <div className="overflow-clip rounded-lg bg-neutral-900">
        {filteredNotes.length === 0 ? (
          <EmptyNote />
        ) : (
          filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} params={params} />
          ))
        )}
      </div>
    </aside>
  );
}

export default React.memo(NoteMenu);
