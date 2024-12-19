import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Footer(): React.ReactNode {
  return (
    <footer className="w-full mt-4 mx-auto space-y-2 py-6 px-12 text-center text-zinc-500 dark:text-zinc-400 overflow-hidden">
      <p className="space-x-3">
        <Link
          href="/disclaimer"
          className="text-zinc-600 dark:text-zinc-400 underline decoration-dashed decoration-yellow-400">
          <strong>Disclaimer</strong>
        </Link>
        <span>&bull;</span>
        <span>&copy; 2024</span>
      </p>
      <p>
        Trademarks used on this website are the property of their respective
        owners.
      </p>
    </footer>
  );
}
