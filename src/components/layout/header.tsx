import Link from "next/link";
import { Icon } from "@iconify/react";
import ThemeToggle from "@/components/misc/theme-toggle";

export default function Header(): React.ReactNode {
  return (
    <header className="w-full max-w-5xl mx-auto py-3 px-6 flex items-center justify-end">
      {/*  border border-y-0 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 */}
      <nav className="flex items-center justify-between">
        <ul className="flex items-center justify-between gap-x-2 *:shrink-0">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link
              className="text-sm flex items-center justify-center rounded-md focus-visible:global-focus cursor-pointer px-3 py-1 gap-x-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 bg-zinc-100 dark:bg-zinc-800"
              href="/submit">
              Submit
              <Icon icon="ph:circles-three-plus-duotone" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
