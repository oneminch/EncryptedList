export default function ProductItemSkeleton(): React.ReactNode {
  return (
    <li className="w-full p-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col justify-center gap-y-4 animate-pulse">
      <div className="flex items-center gap-x-4">
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg h-12 w-12 shrink-0" />
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-1/5 h-4" />
      </div>
      <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-2/3 h-4" />
    </li>
  );
}
