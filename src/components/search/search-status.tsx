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
      <div className="pt-2 py-4 my-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-x-1 text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900">
        <div className="flex items-center">
          <Icon
            icon="heroicons:magnifying-glass-20-solid"
            className="flex items-center justify-center mr-2 text-xl"
          />
          <h2 className="text-left font-medium">
            Showing Results for &#10077;
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
