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
  const [selectedSort, setSelectedSort] = useState<string[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const tagsFromUrl = searchParams.get("tags");
    const sortFromUrl = searchParams.get("sort");

    setSelectedTags(tagsFromUrl ? tagsFromUrl.split(",") : []);
    setSelectedSort(sortFromUrl ? sortFromUrl.split(",") : []);
  }, [searchParams]);

  useEffect(() => {
    setIsSorted(selectedSort.length > 0);
  }, [selectedSort]);

  const updateUrlSearchParams = (key: string, value: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (value.length > 0) {
      params.set(key, value.join(","));
    } else {
      params.delete(key);
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

    const newSelectedTagsArray = Array.from(newSelectedTags);
    setSelectedTags(newSelectedTagsArray);
    updateUrlSearchParams("tags", newSelectedTagsArray);
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    updateUrlSearchParams("tags", []);
  };

  const handleSort = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newSelectedSort = selectedSort.length === 0 ? ["asc"] : [];

    setSelectedSort(newSelectedSort);
    updateUrlSearchParams("sort", newSelectedSort);
  };

  return {
    selectedTags,
    isTagSelected,
    isFilterApplied,
    handleTagChange,
    handleClearTags,
    handleSort,
    isSorted
  };
};
