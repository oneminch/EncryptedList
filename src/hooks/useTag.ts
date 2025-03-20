import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateSearchParams } from "@/lib/utils";

const useTag = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tagsFromUrl = searchParams.getAll("tag");
    setSelectedTags(tagsFromUrl || []);

    setIsLoading(false);
  }, [searchParams]);

  const isTagSelected = (tag: string) => selectedTags.includes(tag);
  const areAnyTagsSelected = (): boolean => selectedTags.length <= 0;
  const totalSelectedTags = (): number => selectedTags.length;

  const handleSelectTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const updatedTags = new Set(selectedTags);
    const tagName = e.target.name;

    if (updatedTags.has(tagName)) {
      updatedTags.delete(tagName);
    } else {
      updatedTags.add(tagName);
    }

    const tagParams = Array.from(updatedTags);
    setSelectedTags(tagParams);

    setTimeout(() => {
      updateSearchParams({
        key: "tag",
        value: tagParams,
        searchParams,
        pathname,
        callback: replace
      });
    }, 0);
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateSearchParams({
        key: "tag",
        value: [],
        searchParams,
        pathname,
        callback: replace
      });
    }, 0);
  };

  return {
    isLoading,
    isTagSelected,
    areAnyTagsSelected,
    handleSelectTag,
    handleClearTags,
    totalSelectedTags
  };
};

export default useTag;
