import useSWR from "swr";
import { fetcher } from "@/lib/products";

export default function useSearch(query: string) {
  const { data, error, isLoading } = useSWR<{ recipes: any[] }>(
    `https://dummyjson.com/recipes/search?q=${query}&limit=10`,
    fetcher
  );

  return {
    products: data ? data.recipes : [],
    isEmpty: data?.recipes?.length === 0,
    isError: !!error,
    isLoading
  };
}
