"use client";

import { Icon } from "@iconify/react";
import usePagination from "@/hooks/usePagination";
import Spinner from "../misc/spinner";

interface PaginationProps {
  totalPages: number | null;
  disabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, disabled }) => {
  const {
    currentPage,
    isOnFirstPage,
    isOnLastPage,
    isLoading,
    toPrevPage,
    toNextPage
  } = usePagination(totalPages);

  return (
    <div
      className={`w-72 text-sm mx-auto my-12 flex items-center justify-center gap-x-4 relative ${
        !totalPages || totalPages <= 1 ? "invisible h-0" : ""
      }`}>
      <button
        disabled={isOnFirstPage || disabled || isLoading}
        onClick={toPrevPage}
        type="button"
        aria-label="Previous Page"
        className="flex items-center justify-center w-8 h-8 py-1 font-semibold duration-150 bg-yellow-500 rounded-full focus-visible:global-focus ring-offset-zinc-50 dark:ring-offset-zinc-950 text-zinc-800 group/hover-effect disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed">
        <Icon
          icon="ph:caret-left"
          className="text-lg group-disabled/hover-effect:translate-x-0 group-hover/hover-effect:-translate-x-1"
        />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={isOnLastPage || disabled || isLoading}
        onClick={toNextPage}
        type="button"
        aria-label="Next Page"
        className="flex items-center justify-center w-8 h-8 py-1 font-semibold duration-150 bg-yellow-500 rounded-full focus-visible:global-focus ring-offset-zinc-50 dark:ring-offset-zinc-950 text-zinc-800 group/hover-effect disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed">
        <Icon
          icon="ph:caret-right"
          className="text-lg group-disabled/hover-effect:translate-x-0 group-hover/hover-effect:translate-x-1"
        />
      </button>
      {isLoading && (
        <Spinner className="absolute right-4 top-1/2 -translate-y-1/2" />
      )}
    </div>
  );
};

export default Pagination;
