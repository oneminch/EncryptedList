import Link from "next/link";
import { Icon } from "@iconify/react";
import ThemeToggle from "@/components/misc/theme-toggle";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`w-full max-w-5xl mx-auto py-3 px-6 flex items-center ${className}`}>
      <nav className="flex items-center justify-between ml-auto">
        <ul className="flex items-center justify-between gap-x-1.5 *:shrink-0">
          <li>
            <Link
              className="text-sm flex items-center justify-center rounded-md focus-visible:global-focus cursor-pointer px-3 py-1 gap-x-2 underline decoration-yellow-400 decoration-dashed hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:bg-zinc-200/50 dark:focus-visible:bg-zinc-800/50"
              href="/">
              Home
              <Icon icon="ph:house-duotone" />
            </Link>
          </li>
          <li className="w-0 h-3 border-x-[0.5px] border-zinc-300 dark:border-zinc-700"></li>
          <li>
            <Link
              className="text-sm flex items-center justify-center rounded-md focus-visible:global-focus cursor-pointer px-3 py-1 gap-x-2 underline decoration-yellow-400 decoration-dashed hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:bg-zinc-200/50 dark:focus-visible:bg-zinc-800/50"
              href="/submit">
              Submit
              <Icon icon="ph:circles-three-plus-duotone" />
            </Link>
          </li>
          <li className="w-0 h-3 border-x-[0.5px] border-zinc-300 dark:border-zinc-700"></li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
