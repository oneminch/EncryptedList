import { useTransition, useState } from "react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

const useTag = () => {
  const [isLoading, startTransition] = useTransition();

  const [queryParamTags, setQueryParamTags] = useQueryState<string[]>(
    "tag",
    parseAsArrayOf(parseAsString)
      .withOptions({ history: "push", shallow: false, startTransition })
      .withDefault([])
  );

  const [tempSelectedTags, setTempSelectedTags] = useState<Set<string>>(
    new Set(queryParamTags)
  );

  const isTagSelected = (tag: string) => tempSelectedTags.has(tag);
  const areAnyTagsSelected = (): boolean => tempSelectedTags.size <= 0;
  const totalSelectedTags = (): number => queryParamTags.length;

  const handleSelectTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagName = e.target.name;
    setTempSelectedTags((prev) => {
      const updated = new Set(prev);
      if (updated.has(tagName)) {
        updated.delete(tagName);
      } else {
        updated.add(tagName);
      }
      return updated;
    });
  };

  const handleApplyTags = () => {
    setQueryParamTags(Array.from(tempSelectedTags));
  };

  const handleClearTags = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTempSelectedTags(new Set());
    setQueryParamTags([]);
  };

  return {
    isLoading,
    isTagSelected,
    areAnyTagsSelected,
    handleSelectTag,
    handleClearTags,
    handleApplyTags,
    totalSelectedTags
  };
};

export default useTag;
