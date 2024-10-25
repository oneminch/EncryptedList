"use client";

import usePagination from "@/hooks/usePagination";
import { Icon } from "@iconify-icon/react";
import React from "react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const { currentPage, isOnFirstPage, isOnLastPage, toPrevPage, toNextPage } =
    usePagination(totalPages);

  return (
    <div className="w-72 mx-auto my-4 flex items-center justify-center gap-x-4">
      <button
        disabled={isOnFirstPage}
        onClick={toPrevPage}
        type="button"
        aria-label="Previous Page"
        className="flex items-center justify-center w-10 h-10 py-1 font-semibold duration-150 bg-yellow-500 border border-zinc-800 dark:border-yellow-500 rounded-full focus-visible:global-focus ring-offset-zinc-50 dark:ring-offset-zinc-950 text-zinc-800 group/hover-effect disabled:bg-zinc-300 dark:disabled:bg-zinc-700 dark:disabled:border-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
      >
        <Icon
          icon="heroicons:chevron-left-20-solid"
          className="text-2xl group-disabled/hover-effect:translate-x-0 group-hover/hover-effect:-translate-x-1"
        />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={isOnLastPage}
        onClick={toNextPage}
        type="button"
        aria-label="Next Page"
        className="flex items-center justify-center w-10 h-10 py-1 font-semibold duration-150 bg-yellow-500 border border-zinc-800 dark:border-yellow-500 rounded-full focus-visible:global-focus ring-offset-zinc-50 dark:ring-offset-zinc-950 text-zinc-800 group/hover-effect disabled:bg-zinc-300 dark:disabled:bg-zinc-700 dark:disabled:border-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
      >
        <Icon
          icon="heroicons:chevron-right-20-solid"
          className="text-2xl group-disabled/hover-effect:translate-x-0 group-hover/hover-effect:translate-x-1"
        />
      </button>
    </div>
  );
}
