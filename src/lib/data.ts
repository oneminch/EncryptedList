import type { SearchApp, SearchResults, AppResultSet, App } from "@/lib/types";
import { createDBArgs, limit as itemsPerPage } from "@/lib/utils";
import getDBClient from "@/lib/db";
import { LibsqlError } from "@libsql/client";

const filterAppsSql = `
  WITH filtered_apps AS (
    SELECT a.id, a.name, a.description, a.url,
      GROUP_CONCAT(t.name, ',') AS all_tags
    FROM apps a
    LEFT JOIN app_tags at ON a.id = at.app_id
    LEFT JOIN tags t ON at.tag_id = t.id
    WHERE (((:query) IS NULL) OR (LOWER(a.name) LIKE '%' || LOWER((:query)) || '%') OR (LOWER(a.description) LIKE '%' || LOWER((:query)) || '%'))
    GROUP BY a.id, a.name, a.description, a.url
  ),
  filtered_and_tagged AS (
    SELECT id, name, description, url, all_tags AS tags
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
  SELECT fat.*, tc.total,
    CASE
      WHEN EXISTS (SELECT 1 FROM app_alternatives aa WHERE aa.app_id = fat.id) THEN 1
      ELSE 0
    END AS has_alternatives
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

const queryAlternativesSql = `
  SELECT a2.name
  FROM apps a1
  JOIN app_alternatives alts ON a1.id = alts.app_id
  JOIN alternatives a2 ON alts.alternative_id = a2.id
  WHERE a1.name = :appName
  ORDER BY a2.name ASC;
`;

const searchAppsSql = `
  SELECT id, name, url
  FROM apps
  WHERE ((:query) IS NULL) OR (name LIKE '%' || (:query) || '%')
  ORDER BY name ASC
  LIMIT 4;
`;

const getApps = async (fetchParams: string): Promise<AppResultSet> => {
  const db = getDBClient();
  const dbArgs = createDBArgs(fetchParams);

  try {
    const res = await db.execute({
      sql: filterAppsSql,
      args: { ...dbArgs }
    });

    const totalFilteredItems =
      res.rows.length > 0 ? (res.rows[0].total as number) : 0;

    return {
      apps: res.rows as unknown as App[],
      totalPages:
        totalFilteredItems > itemsPerPage
          ? Math.ceil(totalFilteredItems / itemsPerPage)
          : null
    };
  } catch (error: any) {
    return {
      apps: [],
      totalPages: null,
      error: error.message as string
    };
  }
};

const getTags = async (): Promise<{
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
    return {
      tags: [],
      error: error.message as string
    };
  }
};

const getAlternatives = async (
  appName: string
): Promise<{
  alternatives: string[];
  error: string | null;
}> => {
  const db = getDBClient();
  try {
    const res = await db.execute({
      sql: queryAlternativesSql,
      args: { appName }
    });

    return {
      alternatives: res.rows.map((altObject) => altObject.name) as string[],
      error: null
    };
  } catch (error: any) {
    return {
      alternatives: [],
      error: error.message as string
    };
  }
};

const searchApps = async (query: string): Promise<SearchResults> => {
  const db = getDBClient();

  try {
    const result = await db.execute({
      sql: searchAppsSql,
      args: {
        query
      }
    });

    return {
      count: result.rows.length,
      searchResults: result.rows as unknown as SearchApp[]
    };
  } catch (e) {
    if (e instanceof LibsqlError) {
      console.error(e);
    }
    throw e;
  }
};

const searchFetcher = async (query: string): Promise<any> => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
};

const submitAppReport = async (data: Record<string, any>): Promise<any> => {
  const response = await fetch("/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reportData: data }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Submission Failed. Try Again.");
  }

  return response.json();
};

const submitNewApp = async (formData: FormData) => {
  const response = await fetch("/api/submit", {
    method: "POST",
    body: formData,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Submission Failed. Try Again.");
  }

  return response.json();
};

export {
  searchAppsSql,
  getApps,
  getTags,
  getAlternatives,
  searchApps,
  searchFetcher,
  submitAppReport,
  submitNewApp
};
