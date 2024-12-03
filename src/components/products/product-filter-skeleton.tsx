export default function ProductFilterSkeleton(): React.ReactNode {
  return (
    <form className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 md:sticky md:top-2 rounded-lg flex flex-col w-full md:w-64 h-auto min-h-12 gap-y-0 md:gap-y-4">
      <header className="flex items-center justify-between">
        <h2 className="hidden md:block font-medium text-xl">Tags</h2>
      </header>
      <div className="max-h-0 md:max-h-96 hidden md:block overflow-hidden md:overflow-visible transition-all duration-100 ease-linear space-y-4">
        <div className="flex gap-2 md:flex-col flex-row md:items-start items-center flex-wrap p-1 md:p-0">
          {Array.from({ length: 5 }, (e, i) => i).map((item) => (
            <div
              className="animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded-lg odd:w-1/3 even:w-1/2 h-4"
              key={item}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
