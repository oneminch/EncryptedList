import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const TAGS = [
  "Web App",
  "Open-Source",
  "Developer Tools",
  "Opt-In",
  "Free",
  "Decentralized"
];

export const useFilter = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const tagsFromUrl = searchParams.get("tags");

    if (tagsFromUrl) {
      setSelectedTags(tagsFromUrl.split(","));
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

  const updateUrlSearchParams = (tags: Set<string>) => {
    const params = new URLSearchParams(searchParams);
    if (tags.size > 0) {
      params.set("tags", Array.from(tags).join(","));
    } else {
      params.delete("tags");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const isTagSelected = (tag: string) => selectedTags.includes(tag);
  const isFilterApplied = () => selectedTags.length <= 0;

  const handleTagChange = (tagName: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tagName)) {
      newSelectedTags.delete(tagName);
    } else {
      newSelectedTags.add(tagName);
    }

    setSelectedTags(Array.from(newSelectedTags));
    updateUrlSearchParams(newSelectedTags);
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    updateUrlSearchParams(new Set());
  };

  return {
    selectedTags,
    isTagSelected,
    isFilterApplied,
    handleTagChange,
    handleClearTags
  };
};
