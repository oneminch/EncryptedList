"use client";

import { memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/misc/theme-toggle";
import pageMeta from "@/lib/metadata";
import SearchSkeleton from "../misc/skeletons/search-skeleton";

const Search = dynamic(() => import("@/components/search/search"), {
  loading: () => <SearchSkeleton />,
  ssr: false
});

interface HeroProps {
  withSearchBar?: boolean;
}

const Hero: React.FC<HeroProps> = ({ withSearchBar }) => {
  const currentPath = usePathname() as keyof typeof pageMeta;

  return (
    <div className="mt-2 md:mt-0 px-2 pt-12 pb-4 flex flex-col items-center justify-center gap-y-4 rounded-lg md:rounded-t-none relative">
      <div
        className={`flex items-center gap-2 ${
          currentPath !== "/" ? "flex-col" : "flex-row"
        }`}>
        <Link
          className="flex items-center justify-center rounded-full focus-visible:global-focus focus-visible:ring-yellow-500 dark:focus-visible:ring-yellow-500"
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

      <ThemeToggle className="md:hidden! text-lg! absolute top-2 right-2" />
      {withSearchBar && <Search />}
    </div>
  );
};

export default memo(Hero);
