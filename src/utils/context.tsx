import React, { createContext } from "react";
import { useLocalStorage } from "./hooks.js";
import INotes from "../types/notes.js";

export const NoteContext = createContext<{
  notes: INotes[];
  setNotes: (T: INotes[]) => void;
}>({
  notes: [],
  setNotes: () => {},
});

export default function NoteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotes] = useLocalStorage<INotes[]>("notes", []);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
}
