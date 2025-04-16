"use client";

import { memo } from "react";
import Sort from "@/components/search/search-sort";
import TagItem from "@/components/search/search-filter-tag";
import useTag from "@/hooks/useTag";
import Spinner from "../misc/spinner";

interface FilterProps {
  tags: string[];
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ tags, className }) => {
  const {
    handleClearTags,
    areAnyTagsSelected,
    isTagSelected,
    isLoading,
    handleSelectTag,
    handleApplyTags
  } = useTag();

  return (
    <form
      className={`pt-4 bg-transparent flex flex-col gap-y-4 w-full h-auto overflow-hidden ${className}`}>
      <header className="flex items-center justify-between">
        <h2 className="font-medium text-xl">Tags</h2>

        <hgroup className="flex items-center gap-x-4">
          {isLoading && <Spinner />}

          <Sort />
        </hgroup>
      </header>

      <div className="overflow-hidden md:overflow-visible transition-all duration-100 ease-linear space-y-4">
        <div className="flex flex-row flex-wrap items-center gap-2 overflow-visible p-1 md:p-0">
          {tags &&
            tags.map((item) => (
              <TagItem
                key={item}
                name={item}
                disabled={isLoading}
                checked={isTagSelected(item.toLocaleLowerCase())}
                handleChange={handleSelectTag}
              />
            ))}
        </div>

        <div className="flex items-center gap-x-2 pt-4 border-t border-dashed border-zinc-300 dark:border-zinc-700">
          <button
            className="w-full text-sm px-3 py-1 mt-auto h-8 font-medium flex items-center justify-center rounded-md focus-visible:global-focus bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:border-zinc-200 dark:disabled:border-zinc-700 disabled:focus-visible:ring-0"
            type="button"
            disabled={isLoading || areAnyTagsSelected()}
            onClick={handleApplyTags}>
            Apply Tags
          </button>
          <button
            className="w-full text-sm px-3 py-1 mt-auto h-8 font-medium flex items-center justify-center rounded-md focus-visible:global-focus bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:border-zinc-200 dark:disabled:border-zinc-700 disabled:focus-visible:ring-0"
            type="button"
            onClick={handleClearTags}
            disabled={areAnyTagsSelected()}>
            Clear Selection
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(Filter);
