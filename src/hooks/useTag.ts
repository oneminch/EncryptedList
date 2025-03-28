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
    const tagName = e.target.name;

    setSelectedTags((prevTags) => {
      const updatedTags = new Set(prevTags);

      if (updatedTags.has(tagName)) {
        updatedTags.delete(tagName);
      } else {
        updatedTags.add(tagName);
      }

      return Array.from(updatedTags);
    });
  };

  const handleApplySelectedTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setSelectedTags((currentTags) => {
      updateSearchParams({
        key: "tag",
        value: currentTags,
        searchParams,
        pathname,
        callback: replace
      });

      return currentTags;
    });
    setIsLoading(false);
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setSelectedTags([]);
    }, 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  };

  return {
    isLoading,
    isTagSelected,
    areAnyTagsSelected,
    handleSelectTag,
    handleApplySelectedTags,
    handleClearTags,
    totalSelectedTags
  };
};

export default useTag;
