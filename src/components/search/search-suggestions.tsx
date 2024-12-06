import React from "react";
import SearchItem from "@/components/search/search-item";
import SearchSkeleton from "@/components/search/search-skeleton";
import useSearchSuggest from "@/hooks/useSearchSuggest";
import { Product } from "@/lib/types";

export default function SearchSuggestions({
  query,
  onNoSuggestions,
  onSomeSuggestions
}: {
  query: string;
  onNoSuggestions: () => void;
  onSomeSuggestions: () => void;
}) {
  const { products, totalCount, isEmpty, isError, isLoading } =
    useSearchSuggest(query);

  let searchSuggestions: React.ReactNode;

  if (isError) {
    searchSuggestions = (
      <SuggestionItem content={<p>An Error Has Occurred. Try Again.</p>} />
    );

    // Disable Submission Handler for <Search />
    onNoSuggestions();
  } else if (isLoading) {
    searchSuggestions = <SearchSkeleton />;

    // Re-enable Submission for <Search />
    onSomeSuggestions();
  } else if (isEmpty) {
    searchSuggestions = (
      <SuggestionItem content={<p>No Matching Products Found.</p>} />
    );

    // Disable Submission Handler for <Search />
    onNoSuggestions();
  } else {
    searchSuggestions = [
      products.map((item: Omit<Product, "tags">) => (
        <SearchItem product={item} key={item.id} />
      )),
      totalCount > 3 && (
        <SuggestionItem
          key={"view-all"}
          content={
            <p className="hidden md:inline-block">
              Press &apos;Enter&apos; for All Results
            </p>
          }
        />
      )
    ];

    // Re-enable Submission for <Search />
    onSomeSuggestions();
  }

  return (
    <ul
      id="search-suggestions"
      className="w-full sm:mt-2 sm:max-h-72 bg-white dark:bg-zinc-900 z-50 sm:absolute sm:top-full sm:border sm:border-zinc-200 sm:dark:border-zinc-700 sm:rounded-md sm:shadow-xl overflow-y-auto overflow-x-hidden">
      {searchSuggestions}
    </ul>
  );
}

function SuggestionItem({
  content
}: {
  content: React.ReactNode;
}): React.ReactNode {
  return (
    <li className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
      {content}
    </li>
  );
}
