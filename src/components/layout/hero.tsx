"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/shared/theme-toggle";
import pageMeta from "@/lib/metadata";

const Search = dynamic(() => import("@/components/search/search"), {
  ssr: false
});

export default function Hero({
  withSearchBar
}: {
  withSearchBar?: boolean;
}): React.ReactNode {
  const currentPath = usePathname() as keyof typeof pageMeta;

  return (
    <div className="mt-2 md:mt-0 px-6 py-10 md:py-8 flex flex-col items-center justify-center gap-y-4 border md:border-t-0 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg md:rounded-t-none relative">
      <div
        className={`flex items-center gap-2 ${
          currentPath !== "/" ? "flex-col" : "flex-row"
        }`}>
        <Link
          className="flex items-center justify-center rounded-full focus-visible:global-focus"
          href="/"
          aria-label="Home"
          title="Home">
          <Image
            src="/logo.svg"
            alt="EncryptedList's Logo"
            width={48}
            height={48}
            className="w-12 h-12 dark:rounded-full dark:border dark:border-zinc-800"
          />
        </Link>
        <h1 className="text-center font-semibold text-2xl sm:text-3xl">
          {pageMeta[currentPath]?.minimalTitle}
        </h1>
      </div>
      <p className="text-center text-zinc-600 dark:text-zinc-400 font-medium text-lg sm:text-xl">
        {pageMeta[currentPath]?.description}
      </p>

      <ThemeToggle className="md:!hidden absolute top-2 right-2 !border-b !rounded-full" />

      {currentPath === "/" && withSearchBar && <Search />}
    </div>
  );
}
