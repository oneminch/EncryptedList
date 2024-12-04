import type {
  ApiResponse,
  ProductResultSet,
  FetchResult,
  Product
} from "@/lib/types";
import { Client } from "@libsql/client";
import { createDBArgs } from "./utils";

const productQuerySql = `
  WITH filtered_apps AS (
    SELECT a.id, a.name, a.icon, a.description,
      GROUP_CONCAT(t.name, ',') AS all_tags
    FROM apps a
    LEFT JOIN app_tags at ON a.id = at.app_id
    LEFT JOIN tags t ON at.tag_id = t.id
    WHERE (((:query) IS NULL) OR (LOWER(a.name) LIKE '%' || LOWER((:query)) || '%') OR (LOWER(a.description) LIKE '%' || LOWER((:query)) || '%'))
    GROUP BY a.id, a.name, a.icon, a.description
  )
  SELECT id, name, icon, description, all_tags AS tags
  FROM filtered_apps
  WHERE (:tags) IS NULL OR id IN (
    SELECT a.id
    FROM apps a
    JOIN app_tags at ON a.id = at.app_id
    JOIN tags t ON at.tag_id = t.id
    WHERE LOWER(t.name) IN (SELECT value FROM json_each((:tags)))
    GROUP BY a.id
    HAVING COUNT(DISTINCT t.name) = (SELECT COUNT(value) FROM json_each((:tags)))
  )
  ORDER BY
    CASE
      WHEN (:sort) = 'asc' THEN name
    END ASC,
    CASE
      WHEN (:sort) IS NULL THEN id
    END DESC
  LIMIT (:limit) OFFSET (:offset);
`;

export const getProducts = async (
  db: Client,
  fetchParams: string
): Promise<ProductResultSet> => {
  const dbArgs = createDBArgs(fetchParams);

  try {
    const res = await db.execute({
      sql: productQuerySql,
      args: { ...dbArgs }
    });
    return {
      products: res.rows as unknown as Product[],
      total: res.rows.length
      // error: null
    };
  } catch (error: any) {
    console.error(error);
    return {
      products: [],
      // total: null,
      error: error.message as string
    };
  }
};

export const getTags = async (
  db: Client
): Promise<{ tags: string[]; error: string | null }> => {
  try {
    const res = await db.execute(`
      SELECT name
      FROM tags
      ORDER BY name ASC;
    `);

    return {
      tags: res.rows.map((tagObject) => tagObject.name) as string[],
      error: null
    };
  } catch (error: any) {
    console.error(error);
    return {
      tags: [],
      error: error.message as string
    };
  }
};

export const queryProducts = async (
  fetchParams: string
): Promise<FetchResult> => {
  const perPage = 10;
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
      throw new Error("Failed to Fetch Products. Refresh the Page.");
    }

    const data: ApiResponse = await response.json();

    return {
      products: data.recipes,
      total: data.total,
      error: null
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

export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  return fetch(...args).then((res) => res.json());
};
