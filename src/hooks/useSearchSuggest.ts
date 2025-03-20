import useSWR from "swr";
import { searchFetcher } from "@/lib/data";
import type { SearchResults } from "@/lib/types";

const useSearchSuggest = (query: string) => {
  const { data, error, isLoading } = useSWR<SearchResults, Error>(
    query,
    searchFetcher
  );

  return {
    apps: data?.searchResults || [],
    totalCount: data?.count || 0,
    isEmpty: data?.count === 0,
    isError: !!error,
    isLoading
  };
};

export default useSearchSuggest;
