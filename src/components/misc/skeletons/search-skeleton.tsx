export default function SearchSkeleton(): React.ReactNode {
  return (
    <div className="w-full sm:w-4/5 lg:w-7/12 max-w-3xl h-9 bg-transparent flex flex-col items-center justify-center sm:flex-row gap-y-2 gap-x-1 animate-pulse">
      <div className="w-full h-full text-base rounded-lg sm:rounded-l-3xl sm:rounded-r border-[0.75px] border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 py-2 px-9" />
      <div className="shrink-0 w-24 h-full rounded-lg sm:rounded-r-3xl sm:rounded-l border-[0.75px] border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 ml-1" />
    </div>
  );
}
