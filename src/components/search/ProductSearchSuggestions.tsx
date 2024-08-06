import React from "react";
import ProductSearchItem from "./ProductSearchItem";
import ProductSearchItemSkeleton from "./ProductSearchItemSkeleton";
import useSearchSuggest from "@/hooks/useSearchSuggest";

const SearchSuggestionItem = ({
  content
}: {
  content: string;
}): React.ReactNode => {
  return (
    <li className="w-full py-2 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
      <p>{content}</p>
    </li>
  );
};

export default function ProductSearchSuggestions({ query }: { query: string }) {
  const { products, totalCount, isEmpty, isError, isLoading } =
    useSearchSuggest(query);

  let searchSuggestions: React.ReactNode;

  if (isError) {
    searchSuggestions = (
      <SearchSuggestionItem content="An Error Has Occurred." />
    );
  } else if (isLoading) {
    searchSuggestions = (
      <>
        <ProductSearchItemSkeleton />;
        <ProductSearchItemSkeleton />;
        <ProductSearchItemSkeleton />;
      </>
    );
  } else if (isEmpty) {
    searchSuggestions = (
      <SearchSuggestionItem content="No Matching Products Found." />
    );
  } else {
    searchSuggestions = products.map((item: any) => (
      <ProductSearchItem product={item} key={item.name} />
    ));
  }

  return (
    <ul
      id="search-suggestions"
      className="w-full sm:mt-2 sm:max-h-72 bg-white dark:bg-zinc-900 z-50 sm:absolute sm:top-full sm:border sm:border-zinc-200 sm:dark:border-zinc-700 sm:rounded-md sm:shadow-xl overflow-y-auto overflow-x-hidden"
    >
      {searchSuggestions}

      <SearchSuggestionItem content="Press 'Enter' for All Results" />
    </ul>
  );
}
