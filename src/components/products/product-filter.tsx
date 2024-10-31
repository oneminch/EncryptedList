"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import TagList from "@/components/products/product-filter-tags";
import Sort from "@/components/products/product-sort";

export default function Filter({
  className
}: {
  className?: string;
}): React.ReactNode {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <form
      className={`dark:border-0 md:dark:border border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 sticky top-2 rounded-lg flex flex-col gap-y-4 w-full md:w-64 h-auto min-h-12 ${
        isCollapsed && "gap-y-0 md:gap-y-4"
      } ${className}`}>
      <header className="flex items-center justify-between">
        <h2 className="hidden md:block font-medium text-xl">Tags</h2>
        <button
          className="flex items-center md:hidden w-full font-medium text-xl outline-none group"
          type="button"
          onClick={toggleCollapse}>
          <span>Tags</span>
          <Icon
            icon={
              isCollapsed
                ? "heroicons:chevron-right-20-solid"
                : "heroicons:chevron-down-20-solid"
            }
            className="flex items-center justify-center text-2xl ml-1 group-focus-visible:global-focus rounded-lg"
          />
        </button>
        <Sort />
      </header>
      <TagList collapse={isCollapsed} />
    </form>
  );
}
