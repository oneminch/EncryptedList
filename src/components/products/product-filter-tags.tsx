"use client";

import { useTag, TAGS } from "@/hooks/useTag";

export default function TagList({ collapse }: { collapse: boolean }) {
  const { handleClearTags, areAnyTagsSelected } = useTag();

  return (
    <div
      className={`${
        collapse ? "max-h-0 md:max-h-96 hidden md:block" : "block max-h-96"
      } overflow-hidden md:overflow-visible transition-all duration-100 ease-linear space-y-4`}>
      <div className="flex md:flex-col flex-row md:items-start items-center flex-wrap p-1 md:p-0">
        {TAGS.map((item) => (
          <TagItem key={item} tag={item} />
        ))}
      </div>
      <button
        className="w-full px-4 py-2 mt-auto h-9 font-medium flex items-center justify-center rounded-md border border-b-2 focus-visible:global-focus bg-yellow-500 text-zinc-800 border-zinc-800 dark:border-yellow-500 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:border-zinc-200 dark:disabled:border-zinc-700 disabled:focus-visible:ring-0"
        type="submit"
        onClick={handleClearTags}
        disabled={areAnyTagsSelected()}>
        Clear Tags
      </button>
    </div>
  );
}

function TagItem({ tag }: { tag: string }): React.ReactNode {
  const { handleSelectTag, isTagSelected } = useTag();

  return (
    <label className="text-sm font-medium mr-2 mb-2 rounded-full min-w-16 h-8 md:h-6 cursor-pointer select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        name={tag.toLocaleLowerCase()}
        checked={isTagSelected(tag.toLocaleLowerCase())}
        onChange={handleSelectTag}
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
