import { useState } from "react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

const useTag = () => {
  const [queryParamTags, setQueryParamTags] = useQueryState<string[]>(
    "tag",
    parseAsArrayOf(parseAsString)
      .withOptions({ history: "push", shallow: false })
      .withDefault([])
  );

  const [isLoading, setIsLoading] = useState(false);

  const isTagSelected = (tag: string) => queryParamTags.includes(tag);
  const areAnyTagsSelected = (): boolean => queryParamTags.length <= 0;
  const totalSelectedTags = (): number => queryParamTags.length;

  const handleSelectTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagName = e.target.name;

    setQueryParamTags((prevTags) => {
      const updatedTags = new Set(prevTags);

      if (updatedTags.has(tagName)) {
        updatedTags.delete(tagName);
      } else {
        updatedTags.add(tagName);
      }

      return Array.from(updatedTags);
    });
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setQueryParamTags([]);
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
    handleClearTags,
    totalSelectedTags
  };
};

export default useTag;
