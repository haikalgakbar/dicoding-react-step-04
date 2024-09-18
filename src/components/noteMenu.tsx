import React, { useContext } from "react";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TABS } from "../utils/constant.js";
import { capitalize, filterNotes } from "../utils/format.js";
import { NoteContext } from "../utils/context.js";
import { motion, AnimatePresence } from "framer-motion";
import Tab from "./noteMenu/tab.js";
import AddForm from "./noteMenu/addForm.js";
import Search from "./noteMenu/search.js";
import NoteCard from "./noteMenu/note.js";
import NoteNotFound from "./noteMenu/noteNotFound.js";
import EmptyNote from "./noteMenu/emptyNote.js";

function NoteMenu({
  params,
  isMobile,
}: {
  params: string | null;
  isMobile: boolean;
}) {
  const { notes, setNotes } = useContext(NoteContext);
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
          <motion.span
            animate={{ rotate: isAddNote ? 45 : 0 }}
            className="block"
          >
            <Plus size={20} />
          </motion.span>
        </button>
      </header>
      <AnimatePresence>
        {isAddNote && (
          <AddForm key="addForm" notes={notes} setNotes={setNotes} />
        )}
      </AnimatePresence>
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
      {notes.length === 0 ? (
        <EmptyNote />
      ) : search.length > 0 ? (
        <NoteNotFound />
      ) : filteredNotes.length === 0 ? (
        <NoteNotFound />
      ) : (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-600">
            {filteredNotes.length} notes
          </span>
          <div className="overflow-clip rounded-lg bg-neutral-900">
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} params={params} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </aside>
  );
}

export default React.memo(NoteMenu);
