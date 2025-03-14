"use client";

import SearchItem from "./search-item";
import SearchItemSkeleton from "../misc/skeletons/search-item-skeleton";
import useSearchSuggest from "@/hooks/useSearchSuggest";
import type { SearchApp } from "@/lib/types";
import SuggestionItem from "./search-suggestion-item";

export default function SearchSuggestions({
  query,
  onNoSuggestions,
  onSomeSuggestions
}: {
  query: string;
  onNoSuggestions: () => void;
  onSomeSuggestions: () => void;
}): React.ReactNode {
  const { apps, totalCount, isEmpty, isError, isLoading } =
    useSearchSuggest(query);

  if (isError || isEmpty) {
    // Disable Submission Handler for <Search />
    onNoSuggestions();
  } else {
    // Re-enable Submission for <Search />
    onSomeSuggestions();
  }

  return (
    <ul
      id="search-suggestions"
      className="w-full mt-2 max-h-72 bg-white dark:bg-zinc-900 z-50 absolute top-[calc(100%-3rem)] border-[0.9px] border-zinc-300 dark:border-zinc-700 rounded-md shadow-xl shadow-black/15 dark:shadow-black overflow-y-auto overflow-x-hidden">
      {isError && (
        <SuggestionItem content={"An Error Has Occurred. Try Again."} />
      )}
      {isLoading && <SearchItemSkeleton />}
      {isEmpty && <SuggestionItem content={"No Matching Apps Found."} />}
      {!isError && !isEmpty && !isLoading && (
        <>
          {apps.map((item: SearchApp) => (
            <SearchItem app={item} key={item.id} />
          ))}
          {totalCount > 3 && (
            <SuggestionItem content={"Press 'Enter' for All Results"} />
          )}
        </>
      )}
    </ul>
  );
}
