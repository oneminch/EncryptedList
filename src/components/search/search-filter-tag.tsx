"use client";

import { Icon } from "@iconify/react";

interface TagItemProps {
  name: string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TagItem: React.FC<TagItemProps> = ({ name, checked, handleChange }) => {
  return (
    <label className="text-sm rounded-full min-w-16 h-6 select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        name={name.toLocaleLowerCase()}
        checked={checked}
        onChange={(e) => handleChange(e)}
      />
      <span className="w-full h-full py-1 pl-2 pr-4 md:py-0.5 flex items-center gap-x-1 rounded-full peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-500 peer-checked:text-zinc-800 bg-zinc-200 dark:bg-zinc-700 peer-focus-visible:global-focus cursor-pointer peer-disabled:cursor-not-allowed">
        <Icon
          icon="ph:check-circle-duotone"
          className={`text-xs transition-all duration-150 ${
            checked
              ? "scale-100 opacity-100 visible"
              : "scale-90 opacity-0 invisible"
          }`}
        />
        <span>{name}</span>
      </span>
    </label>
  );
};

export default TagItem;
