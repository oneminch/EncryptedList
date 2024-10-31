import Link from "next/link";
import { Icon } from "@iconify/react";

export default function TabBar() {
  return (
    <nav className="md:hidden min-w-80 shadow-xl min-h-20 border-y border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur fixed right-0 left-0 bottom-0">
      <ul className="w-full h-full pt-4 pb-6 px-2 flex items-center justify-around">
        <li>
          <Link
            className="flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus px-2"
            href="/">
            <Icon
              icon="heroicons:home"
              className="flex items-center justify-center text-2xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Home
            </p>
          </Link>
        </li>

        <li>
          <Link
            href="/search"
            className="flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus px-2">
            <Icon
              icon="heroicons:magnifying-glass-20-solid"
              className="flex items-center justify-center text-2xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Search
            </p>
          </Link>
        </li>

        <li>
          <Link
            href="/submit"
            className="flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus px-2">
            <Icon
              icon="heroicons:plus-circle-20-solid"
              className="flex items-center justify-center text-2xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Submit
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
