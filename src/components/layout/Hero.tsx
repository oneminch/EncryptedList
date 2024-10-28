"use client";

import Image from "next/image";
import ProductSearch from "../search/ProductSearch";
import { usePathname } from "next/navigation";
import { metadata as pageMeta } from "@/lib/metadata";
import ThemeToggleButton from "../shared/ThemeToggleButton";

export default function Hero({
  withSearchBar,
  withLogo
}: {
  withSearchBar?: boolean;
  withLogo?: boolean;
}) {
  const currentPath = usePathname() as keyof typeof pageMeta;

  return (
    <div className="mt-2 md:mt-0 px-6 py-10 md:py-8 flex flex-col items-center justify-center gap-y-4 border md:border-t-0 border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg md:rounded-t-none relative">
      <div
        className={`flex items-center gap-4 ${
          currentPath !== "/" ? "flex-col" : "flex-row"
        }`}>
        {withLogo && (
          <Image
            src="/logo.svg"
            alt="EncryptedList's Logo"
            className="w-12 h-12 dark:rounded-full dark:border dark:border-zinc-800"
            width={48}
            height={48}
          />
        )}
        <h1 className="text-center font-semibold text-2xl sm:text-3xl">
          {pageMeta[currentPath]?.minimalTitle}
        </h1>
      </div>
      <p className="text-center text-zinc-600 dark:text-zinc-400 font-medium text-lg sm:text-xl">
        {pageMeta[currentPath]?.description}
      </p>

      <ThemeToggleButton className="md:!hidden absolute top-2 right-2 !border-b !rounded-full" />

      {currentPath === "/" && withSearchBar && <ProductSearch />}
    </div>
  );
}
