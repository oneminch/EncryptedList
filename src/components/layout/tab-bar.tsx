import { Icon } from "@iconify/react";
import NavLink from "../shared/nav-link";

export default function TabBar(): React.ReactNode {
  return (
    <nav className="md:hidden min-w-80 shadow-xl min-h-20 border-y border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur fixed right-0 left-0 bottom-0">
      <ul className="w-full h-full pt-2 pb-4 px-4 *:w-1/3 *:*:py-2 *:h-full flex items-center">
        <li>
          <NavLink
            activeClassName="bg-zinc-200 dark:bg-zinc-600"
            className="flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus px-2"
            href="/">
            <Icon
              icon="heroicons:home"
              className="flex items-center justify-center text-2xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              Home
            </p>
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName="bg-zinc-200 dark:bg-zinc-600"
            className="flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus px-2"
            href="/search">
            <Icon
              icon="heroicons:magnifying-glass-20-solid"
              className="flex items-center justify-center text-2xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              Search
            </p>
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName="bg-zinc-200 dark:bg-zinc-600"
            className="flex flex-col items-center justify-center gap-y-1 rounded focus-visible:global-focus px-2"
            href="/submit">
            <Icon
              icon="heroicons:plus-circle"
              className="flex items-center justify-center text-2xl"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              Submit
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
