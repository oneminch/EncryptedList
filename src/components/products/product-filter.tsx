"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Sort from "@/components/products/product-sort";
import TagItem from "@/components/products/product-filter-tag";
import useTag from "@/hooks/useTag";

const Filter = ({
  tags,
  className
}: {
  tags: string[];
  className?: string;
}): React.ReactNode => {
  const { handleClearTags, areAnyTagsSelected, totalSelectedTags } = useTag();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <form
      className={`border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 md:sticky md:top-2 rounded-lg flex flex-col gap-y-4 w-full md:w-64 h-auto min-h-12 ${
        isCollapsed && "gap-y-0 md:gap-y-4"
      } ${className}`}>
      <header className="flex items-center justify-between">
        <h2 className="hidden md:block font-medium text-xl">Tags</h2>
        <button
          className="flex items-center md:hidden gap-x-1 pl-1 pr-2 w-full font-medium text-xl outline-hidden group"
          type="button"
          onClick={toggleCollapse}>
          <span>Tags</span>
          <Icon
            icon={
              isCollapsed
                ? "heroicons:chevron-right-20-solid"
                : "heroicons:chevron-down-20-solid"
            }
            className="flex items-center justify-center text-2xl group-focus-visible:global-focus rounded-lg"
          />
          {totalSelectedTags() > 0 && (
            <span
              className="ml-auto bg-yellow-400 text-zinc-900 rounded-full text-base w-6 h-6"
              title={`${totalSelectedTags()} Tags Selected`}>
              {totalSelectedTags()}
            </span>
          )}
        </button>
        <Sort />
      </header>

      <div
        className={`${
          isCollapsed ? "max-h-0 md:max-h-96 hidden md:block" : "block max-h-96"
        } overflow-hidden md:overflow-visible transition-all duration-100 ease-linear space-y-4`}>
        <div className="flex md:flex-col flex-row md:items-start items-center gap-x-2 gap-y-2 flex-wrap">
          {tags && tags.map((item) => <TagItem key={item} tag={item} />)}
        </div>

        <button
          className="w-full px-4 py-2 mt-auto h-9 font-medium flex items-center justify-center rounded-md border border-b-2 focus-visible:global-focus bg-yellow-500 text-zinc-800 border-zinc-800 dark:border-yellow-500 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:border-zinc-200 dark:disabled:border-zinc-700 disabled:focus-visible:ring-0"
          type="submit"
          onClick={handleClearTags}
          disabled={areAnyTagsSelected()}>
          Clear Tags
        </button>
      </div>
    </form>
  );
};

export default React.memo(Filter);
