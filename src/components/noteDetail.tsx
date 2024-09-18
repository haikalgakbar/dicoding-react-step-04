import React, { useContext } from "react";
import EmptyState from "./noteDetail/emptyState.js";
import InvalidParams from "./noteDetail/invalidParams.js";
import NoteContent from "./noteDetail/noteContent.js";
import { NoteContext } from "../utils/context.js";

function NoteDetail({
  params,
  isMobile,
}: {
  params: string | null;
  isMobile: boolean;
}) {
  const { notes, setNotes } = useContext(NoteContext);
  const note = notes.find((note) => note.id.toString() === params);

  return (
    <section
      className={`col-span-full flex flex-col gap-4 rounded-lg bg-neutral-900 p-4 md:col-span-8 xl:col-span-9 ${!isMobile && "m-2"}`}
    >
      {!params ? (
        <EmptyState />
      ) : params && note ? (
        <NoteContent
          isMobile={isMobile}
          note={note}
          notes={notes}
          setNotes={setNotes}
        />
      ) : (
        <InvalidParams params={params ?? ""} />
      )}
    </section>
  );
}

export default React.memo(NoteDetail);
