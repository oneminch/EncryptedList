"use client";

import React from "react";
import { Icon } from "@iconify/react";
import useTag from "@/hooks/useTag";

const TagItem = ({ tag }: { tag: string }): React.ReactNode => {
  const { handleSelectTag, isTagSelected, isLoading } = useTag();

  return (
    <label className="text-sm font-medium rounded-full min-w-16 h-8 md:h-6 select-none disabled">
      <input
        type="checkbox"
        className="peer sr-only"
        name={tag.toLocaleLowerCase()}
        checked={isTagSelected(tag.toLocaleLowerCase())}
        disabled={isLoading}
        onChange={handleSelectTag}
      />
      <span
        className="w-full h-full px-4
py-1 md:px-3 md:py-1 flex items-center justify-center rounded-full peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-500 peer-checked:text-zinc-800 bg-zinc-200 dark:bg-zinc-700 peer-focus-visible:global-focus cursor-pointer peer-disabled:cursor-not-allowed">
        <span>{tag}</span>
        {isTagSelected(tag.toLocaleLowerCase()) && (
          <Icon icon="heroicons:check-16-solid" className="ml-1" />
        )}
      </span>
    </label>
  );
};

export default TagItem;
