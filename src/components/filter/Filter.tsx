"use client";

import { Icon } from "@iconify-icon/react";
import Tag from "./Tag";
import { useFilter, TAGS } from "@/hooks/useFilter";

const Filter: React.FC<{ className: string }> = ({ className }) => {
  const {
    handleClearTags,
    handleTagChange,
    isFilterApplied,
    isTagSelected,
    handleSort,
    isSorted
  } = useFilter();

  return (
    <form
      className={`border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 max-h-72 sticky top-2 rounded-lg flex flex-col gap-y-4 ${className}`}
    >
      <header className="flex items-center justify-between">
        <h2 className="font-medium text-xl">Tags</h2>
        <button
          type="submit"
          className={`w-9 h-9 px-4 py-2 mt-auto font-medium flex items-center justify-center rounded-md border border-b-2 focus-visible:global-focus text-zinc-800 ${
            isSorted
              ? "bg-yellow-500 border-zinc-800 dark:border-yellow-500"
              : "bg-zinc-50 dark:text-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          }`}
          aria-label="Sort Products"
          title="Sort Products"
          onClick={handleSort}
        >
          <Icon icon="heroicons:arrows-up-down-20-solid" />
        </button>
      </header>
      <div className="flex items-center flex-wrap">
        {TAGS.map((item) => (
          <Tag
            key={item}
            tagName={item}
            tagLabel={item}
            tagSelected={isTagSelected(item)}
            onTagChange={handleTagChange}
          />
        ))}
      </div>
      <button
        className="w-full px-4 py-2 mt-auto h-9 font-medium flex items-center justify-center rounded-md border border-b-2 focus-visible:global-focus bg-yellow-500 text-zinc-800 border-zinc-800 dark:border-yellow-500 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:border-zinc-200 dark:disabled:border-zinc-700 disabled:focus-visible:ring-0"
        type="submit"
        onClick={handleClearTags}
        disabled={isFilterApplied()}
      >
        Clear Tags
      </button>
    </form>
  );
};

export default Filter;
