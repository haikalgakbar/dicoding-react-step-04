import NoteDetail from "./components/noteDetail.js";
import NoteMenu from "./components/noteMenu.js";
import { useWindowSize } from "./utils/hooks.js";
import { useState, useEffect } from "react";

function App() {
  const [params, setParams] = useState<string | null>(
    new URL(window.location.href).searchParams.get("note_id"),
  );

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
      {showNoteMenu && <NoteMenu params={params} isMobile={isMobile} />}
      {showNoteDetail && <NoteDetail params={params} isMobile={isMobile} />}
    </>
  );
}

export default App;
