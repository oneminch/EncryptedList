"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function SearchStatus(): React.ReactNode {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    searchQuery.length > 0 && (
      <div className="w-full text-sm px-5 py-2.5 mb-4 border-[0.9px] border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-t-2xl rounded-b-lg flex items-center justify-between gap-x-1 text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center">
          <Icon
            icon="ph:magnifying-glass-duotone"
            className="flex items-center justify-center mr-2 text-xl"
          />
          <h2 className="text-left font-medium">
            Showing Search Results for &#10077;
            <span className="underline decoration-yellow-400 text-zinc-800 dark:text-zinc-100">
              {searchQuery}
            </span>
            &#10078;
          </h2>
        </div>

        <Link
          className="flex items-center justify-center rounded-full bg-zinc-800 dark:bg-zinc-200 focus-visible:global-focus py-0.5 px-3 text-sm text-zinc-200 dark:text-zinc-800 font-medium"
          href="/">
          Clear
        </Link>
      </div>
    )
  );
}
