"use client";

interface TagProps {
  tagName: string;
  tagLabel: string;
  tagSelected: boolean;
  onTagChange: (tagName: string) => void;
}

const Tag: React.FC<TagProps> = ({
  tagName,
  tagLabel,
  tagSelected,
  onTagChange
}) => {
  return (
    <label className="text-sm font-medium mr-2 mb-2 rounded-full min-w-16 h-6 cursor-pointer overflow-hidden select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        name={tagName}
        checked={tagSelected}
        onChange={() => onTagChange(tagName)}
      />
      <span className="w-full h-full px-3 py-1 flex items-center justify-center peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-500 peer-checked:text-zinc-800 bg-zinc-200 dark:bg-zinc-700">
        {tagLabel}
      </span>
    </label>
  );
};

export default Tag;
