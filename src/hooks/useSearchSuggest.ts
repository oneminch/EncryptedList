import useSWR from "swr";
import { fetcher } from "@/lib/data";
import type { SearchResults } from "@/lib/types";

export default function useSearchSuggest(query: string) {
  const { data, error, isLoading } = useSWR<SearchResults, Error>(
    query,
    fetcher
  );

  return {
    products: data?.searchResults || [],
    totalCount: data?.count || 0,
    isEmpty: data?.count === 0,
    isError: !!error,
    isLoading
  };
}
