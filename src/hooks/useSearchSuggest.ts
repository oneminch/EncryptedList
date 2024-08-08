import useSWR from "swr";
import { fetcher } from "@/lib/data";

export default function useSearchSuggest(query: string) {
  const { data, error, isLoading } = useSWR<{ recipes: any[] }>(
    `https://dummyjson.com/recipes/search?q=${query}&limit=3`,
    fetcher
  );

  return {
    products: data ? data.recipes : [],
    totalCount: data?.recipes?.length,
    isEmpty: data?.recipes?.length === 0,
    isError: !!error,
    isLoading
  };
}
