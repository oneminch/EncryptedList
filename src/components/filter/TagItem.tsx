"use client";

import { useTag } from "@/hooks/useTag";

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
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
};

export default Tag;
