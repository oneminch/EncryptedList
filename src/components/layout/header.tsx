import Link from "next/link";
import { Icon } from "@iconify/react";
import ThemeToggle from "@/components/shared/theme-toggle";

export default function Header() {
  return (
    <header className="w-full py-2 px-6 flex items-center justify-end border border-y-0 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center justify-between gap-x-2 *:shrink-0">
          <li>
            <Link className="action-item px-4 py-1" href="/submit">
              Submit
              <Icon icon="heroicons:plus-circle-20-solid" className="ml-2" />
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
