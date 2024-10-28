import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateSearchParams } from "@/lib/utils";

export const TAGS = [
  "Decentralized",
  "Developer Tools",
  "Free",
  "Open-Source",
  "Opt-In",
  "Web App"
];

export const useTag = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const tagsFromUrl = searchParams.getAll("tag");
    setSelectedTags(tagsFromUrl || []);
  }, [searchParams]);

  const isTagSelected = (tag: string) => selectedTags.includes(tag);
  const areAnyTagsSelected = (): boolean => selectedTags.length <= 0;

  const handleSelectTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTags = new Set(selectedTags);
    const tagName = e.target.name;

    if (updatedTags.has(tagName)) {
      updatedTags.delete(tagName);
    } else {
      updatedTags.add(tagName);
    }

    const tagParams = Array.from(updatedTags);
    setSelectedTags(tagParams);

    updateSearchParams({
      key: "tag",
      value: tagParams,
      searchParams,
      pathname,
      callback: replace
    });
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    updateSearchParams({
      key: "tag",
      value: [],
      searchParams,
      pathname,
      callback: replace
    });
  };

  return {
    isTagSelected,
    areAnyTagsSelected,
    handleSelectTag,
    handleClearTags
  };
};
