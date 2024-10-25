"use client";

import TagItem from "./TagItem";
import { useTag, TAGS } from "@/hooks/useTag";

export default function TagList() {
  const { handleClearTags, areAnyTagsSelected } = useTag();

  return (
    <>
      <div className="flex items-center flex-wrap">
        {TAGS.map((item) => (
          <TagItem key={item} tag={item} />
        ))}
      </div>
      <button
        className="w-full px-4 py-2 mt-auto h-9 font-medium flex items-center justify-center rounded-md border border-b-2 focus-visible:global-focus bg-yellow-500 text-zinc-800 border-zinc-800 dark:border-yellow-500 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:border-zinc-200 dark:disabled:border-zinc-700 disabled:focus-visible:ring-0"
        type="submit"
        onClick={handleClearTags}
        disabled={areAnyTagsSelected()}
      >
        Clear Tags
      </button>
    </>
  );
}
