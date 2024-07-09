import { Arguments } from "swr";

export const queryProducts = async ({
  sort,
  tags,
  query,
  currentPage
}: {
  sort: string;
  tags: string[];
  query: string;
  currentPage: number;
}): Promise<any> => {
  return fetch(
    "https://dummyjson.com/recipes?limit=10&select=name,instructions,tags,image"
  ).then((res) => res.json());
};

export const searchProducts = async (query: string): Promise<any> => {
  // return fetch(
  //   `https://dummyjson.com/recipes?limit=50&select=name,instructions,tags,image`
  // ).then((res) => res.json());
  return fetch(`https://dummyjson.com/recipes/search?q=${query}&limit=20`).then(
    (res) => res.json()
  );
};

export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  return fetch(...args).then((res) => res.json());
};
