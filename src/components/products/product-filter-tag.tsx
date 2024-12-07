"use client";

import useTag from "@/hooks/useTag";
import { useEffect, useRef } from "react";

export default function TagItem({
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
    <label className="text-sm font-medium rounded-full min-w-16 h-8 md:h-6 cursor-pointer select-none">
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
