export default function Search({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-neutral-900 p-2 has-[:focus-within]:outline has-[:focus-within]:outline-1 has-[:focus-within]:outline-offset-2 has-[:focus-within]:outline-neutral-200">
      {children}
    </div>
  );
}
