"use client";

import SearchItem from "./search-item";
import SearchItemSkeleton from "../misc/skeletons/search-item-skeleton";
import useSearchSuggest from "@/hooks/useSearchSuggest";
import type { SearchApp } from "@/lib/types";
import SuggestionItem from "./search-suggestion-item";

interface SearchSuggestionsProps {
  query: string;
  className: string;
  onNoSuggestions: () => void;
  onSomeSuggestions: () => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  className,
  onNoSuggestions,
  onSomeSuggestions
}) => {
  const { apps, totalCount, isEmpty, isError, isLoading } =
    useSearchSuggest(query);

  if (isError || isEmpty) {
    onNoSuggestions();
  } else {
    onSomeSuggestions();
  }

  return (
    <ul
      id="search-suggestions"
      className={`w-full mt-2 max-h-72 bg-white dark:bg-zinc-900 z-50 absolute top-[calc(100%-3rem)] sm:top-full border-[0.9px] border-zinc-300 dark:border-zinc-700 rounded-md shadow-xl shadow-black/15 dark:shadow-black overflow-y-auto overflow-x-hidden ${className}`}>
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
};

export default SearchSuggestions;
