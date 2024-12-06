import useSWR from "swr";
import { fetcher } from "@/lib/data";
import { Product } from "@/lib/types";

export default function useSearchSuggest(query: string) {
  const { data, error, isLoading } = useSWR<Omit<Product, "tags">[], Error>(
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
