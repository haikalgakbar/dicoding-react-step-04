import NoteDetail from "./components/noteDetail.js";
import NoteMenu from "./components/noteMenu.js";
import INotes from "./types/notes.js";
import { useWindowSize } from "./utils/hooks.js";
import { useState, useEffect } from "react";
import { getInitialData } from "./utils/data.js";

function App() {
  const [params, setParams] = useState<string | null>(
    new URL(window.location.href).searchParams.get("note_id"),
  );
  const [notes, setNotes] = useState<INotes[]>(getInitialData());

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const showNoteDetail = !isMobile || params;
  const showNoteMenu = !isMobile || !params;

  useEffect(() => {
    const handlePopState = () => {
      setParams(new URL(window.location.href).searchParams.get("note_id"));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {showNoteMenu && (
        <NoteMenu
          notes={notes}
          setNotes={setNotes}
          params={params}
          isMobile={isMobile}
        />
      )}
      {showNoteDetail && (
        <NoteDetail
          setNotes={setNotes}
          notes={notes}
          params={params}
          isMobile={isMobile}
        />
      )}
    </>
  );
}

export default App;
