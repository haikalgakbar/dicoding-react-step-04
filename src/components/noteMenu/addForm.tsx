import INotes from "../../types/notes.js";
import { MAX_TITLE_LENGTH } from "../../utils/constant.js";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddForm({
  notes,
  setNotes,
}: {
  notes: INotes[] | null;
  setNotes: (T: INotes[]) => void;
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

    setNotes([
      ...(notes ?? []),
      {
        id: +new Date(),
        title,
        body,
        archived: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setTitle("");
    setBody("");
  }

  return (
    <motion.form
      key="addFor"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.2,
      }}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
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
    </motion.form>
  );
}
