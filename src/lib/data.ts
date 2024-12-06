import type { ProductResultSet, Product } from "@/lib/types";
import { createDBArgs, limit as itemsPerPage } from "./utils";
import { getDBClient } from "./db";

const filterProductsSql = `
  WITH filtered_apps AS (
    SELECT a.id, a.name, a.icon, a.description,
      GROUP_CONCAT(t.name, ',') AS all_tags
    FROM apps a
    LEFT JOIN app_tags at ON a.id = at.app_id
    LEFT JOIN tags t ON at.tag_id = t.id
    WHERE (((:query) IS NULL) OR (LOWER(a.name) LIKE '%' || LOWER((:query)) || '%') OR (LOWER(a.description) LIKE '%' || LOWER((:query)) || '%'))
    GROUP BY a.id, a.name, a.icon, a.description
  ),
  filtered_and_tagged AS (
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
  ),
  total_count AS (
    SELECT COUNT(*) AS total FROM filtered_and_tagged
  )
  SELECT fat.*, tc.total
  FROM filtered_and_tagged fat, total_count tc
  ORDER BY
    CASE
      WHEN (:sort) = 'asc' THEN name
    END ASC,
    CASE
      WHEN (:sort) IS NULL THEN id
    END DESC
  LIMIT (:limit) OFFSET (:offset);
`;

const queryTagsSql = `
  SELECT name
  FROM tags
  ORDER BY name ASC;
`;

export const searchProductsSql = `
  SELECT id, name, icon, description
  FROM apps
  WHERE ((:query) IS NULL) OR (LOWER(name) LIKE '%' || LOWER((:query)) || '%') OR (LOWER(description) LIKE '%' || LOWER((:query)) || '%')
  ORDER BY name ASC
  LIMIT 4;
`;

export const getProducts = async (
  fetchParams: string
): Promise<ProductResultSet> => {
  const db = getDBClient();
  const dbArgs = createDBArgs(fetchParams);

  try {
    const res = await db.execute({
      sql: filterProductsSql,
      args: { ...dbArgs }
    });

    const totalFilteredItems =
      res.rows.length > 0 ? (res.rows[0].total as number) : 0;

    return {
      products: res.rows as unknown as Product[],
      totalPages:
        totalFilteredItems > itemsPerPage
          ? Math.ceil(totalFilteredItems / itemsPerPage)
          : null
    };
  } catch (error: any) {
    // console.error(error);
    return {
      products: [],
      totalPages: null,
      error: error.message as string
    };
  }
};

export const getTags = async (): Promise<{
  tags: string[];
  error: string | null;
}> => {
  const db = getDBClient();
  try {
    const res = await db.execute(queryTagsSql);

    return {
      tags: res.rows.map((tagObject) => tagObject.name) as string[],
      error: null
    };
  } catch (error: any) {
    // console.error(error);
    return {
      tags: [],
      error: error.message as string
    };
  }
};

export const searchProducts = async (
  query: string
): Promise<Omit<Product, "tags">[]> => {
  const db = getDBClient();

  const result = await db.execute({
    sql: searchProductsSql,
    args: {
      query
    }
  });

  return result.rows as unknown as Omit<Product, "tags">[];
};

export const fetcher = async (query: string): Promise<any> => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
};
