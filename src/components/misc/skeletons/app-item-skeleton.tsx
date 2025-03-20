const AppItemSkeleton: React.FC = () => {
  return (
    <li className="w-full h-64 px-5 pt-4 pb-6 flex flex-col gap-y-3 border-[0.75px] border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg hover:ring-2 hover:ring-zinc-200/75 dark:hover:ring-zinc-800/75 group relative overflow-hidden animate-pulse">
      <div className="flex items-center gap-x-3 relative">
        <div className="w-9 h-9 z-30 p-0.5 bg-zinc-100 dark:bg-zinc-700 rounded-lg aspect-square object-contain grow-0 shrink-0 overflow-hidden" />
        <div className="flex flex-col items-start gap-y-2 z-30">
          <div className="w-24 h-4 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
        </div>
      </div>

      <div className="z-10 text-sm h-full flex flex-col items-start justify-between gap-y-4 relative">
        <div className="w-full space-y-2.5">
          <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
          <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
          <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
        </div>
        <div className="w-full pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center flex-wrap gap-1">
          <div className="w-16 h-4 bg-zinc-100 dark:bg-zinc-700 rounded-full" />
          <div className="w-16 h-4 bg-zinc-100 dark:bg-zinc-700 rounded-full" />
          <div className="w-16 h-4 bg-zinc-100 dark:bg-zinc-700 rounded-full" />
        </div>
      </div>
    </li>
  );
};

export default AppItemSkeleton;
