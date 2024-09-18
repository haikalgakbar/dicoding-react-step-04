export default function InvalidParams({ params }: { params: string | null }) {
  return (
    <div className="m-auto flex max-w-96 flex-col gap-2 text-center">
      <h2 className="text-2xl font-medium">No note found</h2>
      <p className="text-neutral-400">
        It seems there is no note with the id {params}. Maybe try a different id
        or create a new note to get started.
      </p>
    </div>
  );
}
