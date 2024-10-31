import React from "react";
import SearchItem from "@/components/search/search-item";
import SearchSkeleton from "@/components/search/search-skeleton";
import useSearchSuggest from "@/hooks/useSearchSuggest";

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
    searchSuggestions = <SuggestionItem content="An Error Has Occurred." />;

    // Disable Submission Handler for <Search />
    onNoSuggestions();
  } else if (isLoading) {
    searchSuggestions = <SearchSkeleton />;

    // Re-enable Submission for <Search />
    onSomeSuggestions();
  } else if (isEmpty) {
    searchSuggestions = (
      <SuggestionItem content="No Matching Products Found." />
    );

    // Disable Submission Handler for <Search />
    onNoSuggestions();
  } else {
    searchSuggestions = [
      products.map((item: any) => (
        <SearchItem product={item} key={item.name} />
      )),
      <SuggestionItem
        key={"view-all"}
        content="Press 'Enter' for All Results"
      />
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

function SuggestionItem({ content }: { content: string }): React.ReactNode {
  return (
    <li className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
      <p>{content}</p>
    </li>
  );
}
