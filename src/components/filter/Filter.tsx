"use client";

import SortButton from "./SortButton";
import TagList from "./TagList";

const Filter: React.FC<{ className: string }> = ({ className }) => {
  return (
    <form
      className={`border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 max-h-72 sticky top-2 rounded-lg flex flex-col gap-y-4 ${className}`}
    >
      <header className="flex items-center justify-between">
        <h2 className="font-medium text-xl">Tags</h2>
        <SortButton />
      </header>
      <TagList />
    </form>
  );
};

export default Filter;
