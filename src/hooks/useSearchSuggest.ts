import useSearch from "./useSearch";

export default function useSearchSuggest(query: string) {
  const { products, isEmpty, isError, isLoading } = useSearch(query);

  return {
    products: products.slice(0, 3),
    totalCount: products.length,
    isEmpty,
    isError,
    isLoading
  };
}
