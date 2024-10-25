import type { ApiResponse, FetchResult } from "./types";

export const queryProducts = async (
  fetchParams: string
): Promise<FetchResult> => {
  const perPage = 3;
  let baseUrl = `https://dummyjson.com/recipes`;

  const searchParams = new URLSearchParams(fetchParams);
  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "";
  const tags = searchParams.get("tags")?.split(",") || [];

  searchParams.append("limit", perPage.toString());
  searchParams.append("skip", (perPage * (page - 1)).toString());
  searchParams.append("select", "name,instructions,tags,image");

  if (sort) {
    searchParams.append("sortBy", "name");
    searchParams.append("order", sort);
  }

  if (query) {
    baseUrl = baseUrl + "/search";
    searchParams.append("q", query);
  }

  if (tags && tags.length > 0) {
    searchParams.append("tags", tags.join(","));
  }

  if (page !== undefined) {
    searchParams.append("page", page.toString());
  }

  const queryString = searchParams.toString();
  const apiUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to Fetch Products");
    }

    const data: ApiResponse = await response.json();

    return {
      products: data.recipes,
      total: data.total
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      products: null,
      total: null,
      error: (error as Error).message
    };
  }
};

export const searchProducts = async (query: string): Promise<any> => {
  return fetch(`https://dummyjson.com/recipes/search?q=${query}&limit=20`).then(
    (res) => res.json()
  );
};

export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  return fetch(...args).then((res) => res.json());
};
