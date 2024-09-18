export default function NoteNotFound() {
  return (
    <div className="flex flex-col rounded-lg bg-neutral-900 p-4">
      <h2 className="font-medium">Oops, Nothing Here</h2>
      <p className="text-neutral-400">
        Looks like there are no notes that fit your search criteria. Try
        adjusting your search terms and see what you find.
      </p>
    </div>
  );
}
