"use client";

import SearchItem from "./search-item";
import SearchSkeleton from "../skeletons/search-skeleton";
import useSearchSuggest from "@/hooks/useSearchSuggest";
import type { SearchProduct } from "@/lib/types";
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
  const { products, totalCount, isEmpty, isError, isLoading } =
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
      className="w-full sm:mt-2 sm:max-h-72 bg-white dark:bg-zinc-900 z-50 sm:absolute sm:top-full border-t sm:border border-zinc-200 dark:border-zinc-700 sm:rounded-md sm:shadow-xl shadow-black/15 dark:shadow-black overflow-y-auto overflow-x-hidden">
      {isError && (
        <SuggestionItem content={"An Error Has Occurred. Try Again."} />
      )}
      {isLoading && <SearchSkeleton />}
      {isEmpty && <SuggestionItem content={"No Matching Products Found."} />}
      {!isError && !isEmpty && !isLoading && (
        <>
          {products.map((item: SearchProduct) => (
            <SearchItem product={item} key={item.id} />
          ))}
          {totalCount > 3 && (
            <SuggestionItem content={"Press 'Enter' for All Results"} />
          )}
        </>
      )}
    </ul>
  );
}
