export default function EmptyNote() {
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
