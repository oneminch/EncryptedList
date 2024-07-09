"use client";

import Image from "next/image";
import ProductSearch from "../search/ProductSearch";
import { usePathname } from "next/navigation";
import { metadata as pageMeta } from "@/app/lib/metadata";

export default function Hero({
  withSearchBar,
  withLogo
}: {
  withSearchBar?: boolean;
  withLogo?: boolean;
}) {
  const currentPath = usePathname() as keyof typeof pageMeta;

  return (
    <section className="mt-2 md:mt-0 p-6 flex flex-col items-center justify-center gap-y-4 border md:border-t-0 border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg md:rounded-t-none">
      <div className="flex items-center justify-center gap-x-2">
        {currentPath === "/" && withLogo && (
          <Image
            src="/logo.svg"
            alt="EncryptedList's Logo"
            className="w-12 h-12 dark:rounded-full dark:border dark:border-zinc-800"
            width={48}
            height={48}
          />
        )}
        {currentPath !== "/" && (
          <h1 className="text-center font-semibold text-2xl sm:text-3xl">
            {pageMeta[currentPath]?.minimalTitle}
          </h1>
        )}
      </div>
      <p className="text-center text-zinc-600 dark:text-zinc-400 font-medium text-lg sm:text-xl">
        {pageMeta[currentPath]?.description}
      </p>

      {currentPath === "/" && withSearchBar && <ProductSearch />}
    </section>
  );
}
