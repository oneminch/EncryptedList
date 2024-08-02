import Link from "next/link";
import { Icon } from "@iconify-icon/react";

export default function TabBar() {
  return (
    <nav className="md:hidden min-w-80 shadow-xl min-h-20 border-y border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur fixed right-0 left-0 bottom-0">
      <ul className="w-full h-full pt-4 pb-6 px-2 flex items-center justify-around">
        <li>
          <Link
            className="w-8 h-8 flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus"
            href="/"
          >
            <Icon
              icon="heroicons:home"
              className="flex items-center justify-center text-xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Home
            </p>
          </Link>
        </li>

        <li>
          <Link
            href="/search"
            className="w-8 h-8 flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus"
          >
            <Icon
              icon="heroicons:magnifying-glass-20-solid"
              className="flex items-center justify-center text-xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Search
            </p>
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="w-8 h-8 flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus"
          >
            <Icon
              icon="heroicons:hashtag-20-solid"
              className="flex items-center justify-center text-xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Tags
            </p>
          </button>
        </li>

        <li>
          <button
            type="button"
            className="w-8 h-8 flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus"
          >
            <Icon
              icon="heroicons:bars-2-20-solid"
              className="flex items-center justify-center text-xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Menu
            </p>
          </button>
        </li>
      </ul>

      {/* <div className="flex items-center">
        <ul className="flex items-center gap-x-2 *:shrink-0">
          <li>
            <Link className="action-item px-4 py-2" href="/submit">
              Submit +
            </Link>
          </li>
          <li>
            <Link className="action-item px-4 py-2" href="/favorites">
              Favorites 💛
            </Link>
          </li>
          <li>
            <button className="action-item w-10">🌓</button>
          </li>
        </ul>
      </div> */}
    </nav>
  );
}
