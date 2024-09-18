import navigate from "../../utils/navigate.js";
import NoteStatus from "./noteStatus.js";
import INotes from "../../types/notes.js";
import { showFormattedDate } from "../../utils/format.js";
import { motion } from "framer-motion";

export default function NoteCard({
  note,
  params,
}: {
  note: INotes;
  params: string | null;
}) {
  return (
    <motion.article
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      exit={{ opacity: 0, scale: 0.8 }}
      key={note.id}
      onClick={() => navigate(`/?note_id=${note.id}`)}
      className={`flex flex-col border-b border-neutral-800 p-4 last:border-b-0 hover:cursor-pointer hover:bg-neutral-800/50 ${note.id.toString() === params && "bg-neutral-800/50"}`}
    >
      <h2 className="line-clamp-1 text-neutral-400">{note.title}</h2>
      <p className="line-clamp-2 font-medium">{note.body}</p>
      <div className="mt-2 flex items-center justify-between">
        <NoteStatus variant={note.archived ? "archived" : "default"}>
          {note.archived ? "Archived" : "Active"}
        </NoteStatus>
        <p className="text-sm text-neutral-400">
          {showFormattedDate(note.createdAt)}
        </p>
      </div>
    </motion.article>
  );
}
