"use client";

import { useState } from "react";

interface TagProps {
  tagName: string;
  tagLabel: string;
  tagChecked?: boolean;
  onTagChange: (tagName: string, isChecked: boolean) => void;
}

export default function Tag({
  tagName,
  tagLabel,
  tagChecked = false,
  onTagChange
}: TagProps) {
  const [isChecked, setIsChecked] = useState(tagChecked);

  const handleTagChange = () => {
    const isCurrentlyChecked = !isChecked;
    setIsChecked(isCurrentlyChecked);
    onTagChange(tagName, isCurrentlyChecked);
  };

  return (
    <label className="text-sm font-medium mr-2 mb-2 rounded-full min-w-16 h-6 cursor-pointer overflow-hidden select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        name={tagName}
        checked={isChecked}
        onChange={handleTagChange}
      />
      <span className="w-full h-full px-3 py-1 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 peer-checked:bg-yellow-400">
        {tagLabel}
      </span>
    </label>
  );
}
