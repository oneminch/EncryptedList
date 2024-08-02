// import Image from "next/image";

export default function ProductListItemSkeleton() {
  return (
    <li className="w-full p-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex items-center gap-x-4 animate-pulse">
      <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-12 w-12 shrink-0" />
      <div className="w-full space-y-2">
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-2/3 h-4" />
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-1/2 h-4" />
      </div>
    </li>
  );
}
