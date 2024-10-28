"use client";

import { MouseEvent, useState } from "react";
import SortButton from "./SortButton";
import TagList from "./TagList";
import { Icon } from "@iconify/react";

const Filter: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <form
      className={`dark:border-0 md:dark:border border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 max-h-96 sticky top-2 rounded-lg flex flex-col gap-y-4 ${
        isCollapsed && "gap-y-0 md:gap-y-4"
      }`}>
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
        {/* <hgroup className="flex items-center gap-x-2">
        </hgroup> */}
        <SortButton />
      </header>
      <TagList collapse={isCollapsed} />
    </form>
  );
};

export default Filter;
