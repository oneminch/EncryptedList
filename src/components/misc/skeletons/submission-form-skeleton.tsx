export default function SubmissionFormSkeleton(): React.ReactNode {
  return (
    <div className="flex flex-col gap-y-2 w-2/3 max-w-md mx-auto text-sm animate-pulse">
      <div className="flex flex-col gap-y-4">
        <label>
          <p className="w-24 h-4 bg-zinc-100 dark:bg-zinc-700 rounded" />
          <div className="w-full py-1 px-2 mt-2 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
        </label>
        <label>
          <p className="w-24 h-4 bg-zinc-100 dark:bg-zinc-700 rounded" />
          <div className="w-full py-1 px-2 mt-2 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
        </label>
      </div>
      <div className="flex items-center overflow-hidden h-4 mb-2">
        <p className="w-full h-4 bg-transparent" />
      </div>
      <label className="mb-2">
        <p className="w-32 h-4 bg-zinc-100 dark:bg-zinc-700 rounded mb-2" />
        <div className="w-full p-2 h-24 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
      </label>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center overflow-hidden h-6">
          <p className="w-full h-4 bg-zinc-100 dark:bg-zinc-700 rounded" />
        </div>
        <div className="w-20 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
      </div>
    </div>
  );
}
