"use client";

import { useTags } from "@/hooks/useTags";

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  const { handleSelectTag, isTagSelected } = useTags();

  return (
    <label className="text-sm font-medium mr-2 mb-2 rounded-full min-w-16 h-6 cursor-pointer overflow-hidden select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        name={tag.toLocaleLowerCase()}
        checked={isTagSelected(tag.toLocaleLowerCase())}
        onChange={handleSelectTag}
      />
      <span className="w-full h-full px-3 py-1 flex items-center justify-center peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-500 peer-checked:text-zinc-800 bg-zinc-200 dark:bg-zinc-700">
        {tag}
      </span>
    </label>
  );
};

export default Tag;
