import useSWR from "swr";
import { fetcher } from "@/lib/data";
import type { SearchProduct } from "@/lib/types";

export default function useSearchSuggest(query: string) {
  const { data, error, isLoading } = useSWR<SearchProduct[], Error>(
    query,
    fetcher
  );

  return {
    products: data?.slice(0, 3) || [],
    totalCount: data?.length || 0,
    isEmpty: data?.length === 0,
    isError: !!error,
    isLoading
  };
}
