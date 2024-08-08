import { QueryParams } from "./types";

export const queryProducts = async ({
  page,
  query,
  sort,
  tags
}: QueryParams): Promise<any> => {
  const perPage = 5;
  const baseUrl = `https://dummyjson.com/recipes`;
  const searchParams = new URLSearchParams();

  searchParams.append("limit", perPage.toString());
  searchParams.append("select", "name,instructions,tags,image");

  if (sort) {
    searchParams.append("sortBy", "name");
    searchParams.append("order", sort);
  }

  if (query) {
    searchParams.append("search", query);
  }

  if (tags && tags.length > 0) {
    searchParams.append("tags", tags.join(","));
  }

  if (page !== undefined) {
    searchParams.append("page", page.toString());
  }

  const queryString = searchParams.toString();
  const apiUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
  console.log(apiUrl);

  return fetch(apiUrl).then((res) => res.json());
};

export const searchProducts = async (query: string): Promise<any> => {
  return fetch(`https://dummyjson.com/recipes/search?q=${query}&limit=20`).then(
    (res) => res.json()
  );
};

export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  return fetch(...args).then((res) => res.json());
};
