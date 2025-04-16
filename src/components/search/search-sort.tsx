"use client";

import { Icon } from "@iconify/react";
import useSort from "@/hooks/useSort";
import Spinner from "../misc/spinner";

const Sort: React.FC = () => {
  const { isSorted, handleSort, isLoading } = useSort();

  return (
    <button
      type="button"
      className={`!w-8 !h-8 mt-auto font-medium flex items-center justify-center rounded-md border border-b-2 cursor-pointer disabled:cursor-not-allowed focus-visible:global-focus text-zinc-800 ${
        isSorted
          ? "bg-yellow-500 border-zinc-800 dark:border-yellow-500"
          : "bg-zinc-50 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
      }`}
      aria-label="Sort Apps"
      title="Sort Apps"
      disabled={isLoading}
      onClick={handleSort}>
      {isLoading ? <Spinner /> : <Icon icon="ph:sort-ascending" />}
    </button>
  );
};

export default Sort;
