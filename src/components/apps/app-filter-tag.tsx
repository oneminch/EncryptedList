"use client";

import { Icon } from "@iconify/react";
import useTag from "@/hooks/useTag";

interface TagItemProps {
  tag: string;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  const { handleSelectTag, isTagSelected, isLoading } = useTag();

  return (
    <label className="text-sm rounded-full min-w-16 h-6 select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        name={tag.toLocaleLowerCase()}
        checked={isTagSelected(tag.toLocaleLowerCase())}
        disabled={isLoading}
        onChange={handleSelectTag}
      />
      <span className="w-full h-full py-1 px-4 md:px-3 md:py-0.5 flex items-center justify-center rounded-full peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-500 peer-checked:text-zinc-800 bg-zinc-200 dark:bg-zinc-700 peer-focus-visible:global-focus cursor-pointer peer-disabled:cursor-not-allowed">
        <span>{tag}</span>
        {isTagSelected(tag.toLocaleLowerCase()) && (
          <Icon icon="ph:check" className="ml-1" />
        )}
      </span>
    </label>
  );
};

export default TagItem;
