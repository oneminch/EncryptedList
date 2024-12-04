"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Sort from "@/components/products/product-sort";
import { useTag } from "@/hooks/useTag";
import useArrowNavigation from "@/hooks/useArrowNavigation";

export default function Filter({
  tags,
  className
}: {
  tags: string[];
  className?: string;
}): React.ReactNode {
  const { handleClearTags, areAnyTagsSelected } = useTag();

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

      <div
        className={`${
          isCollapsed ? "max-h-0 md:max-h-96 hidden md:block" : "block max-h-96"
        } overflow-hidden md:overflow-visible transition-all duration-100 ease-linear space-y-4`}>
        <div className="flex md:flex-col flex-row md:items-start items-center flex-wrap p-1 md:p-0">
          {tags && <TagList tags={tags} />}
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
}

function TagList({ tags }: { tags: string[] }): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentIndex, setCurrentIndex } = useArrowNavigation(
    tags.length,
    containerRef
  );

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="flex md:flex-col flex-row md:items-start items-center flex-wrap p-1 md:p-0">
      {tags.map((item, index) => (
        <TagItem
          key={item}
          tag={item}
          isFocused={index === currentIndex}
          onFocus={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );
}

function TagItem({
  isFocused,
  onFocus,
  tag
}: {
  isFocused: boolean;
  onFocus: () => void;
  tag: string;
}): React.ReactNode {
  const { handleSelectTag, isTagSelected } = useTag();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <label className="text-sm font-medium mr-2 mb-2 rounded-full min-w-16 h-8 md:h-6 cursor-pointer select-none">
      <input
        type="checkbox"
        ref={inputRef}
        className="peer sr-only"
        name={tag.toLocaleLowerCase()}
        checked={isTagSelected(tag.toLocaleLowerCase())}
        onChange={handleSelectTag}
        onFocus={onFocus}
      />
      <span
        className="w-full h-full px-4
py-1 md:px-3 md:py-1 flex items-center justify-center rounded-full peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-500 peer-checked:text-zinc-800 bg-zinc-200 dark:bg-zinc-700 peer-focus-visible:global-focus">
        <span>{tag}</span>
        {isTagSelected(tag.toLocaleLowerCase()) && (
          <span className="ml-1">&#10004;</span>
        )}
      </span>
    </label>
  );
}
