import type { ReadonlyURLSearchParams } from "next/navigation";
import type { DBArgTypes, QueryParamKeys, QueryParams } from "@/lib/types";

const limit = 14;

const createDBArgs = (fetchParams: string) => {
  console.log(fetchParams);
  const searchParams = new URLSearchParams(fetchParams);

  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query");
  const sort = searchParams.get("sort");
  const tags = searchParams.get("tag");

  const args: DBArgTypes = {
    limit,
    offset: (page - 1) * limit,
    sort: sort?.toLocaleLowerCase() || null,
    query: query?.toLocaleLowerCase() || null,
    tags: tags ? JSON.stringify(tags) : null
  };

  return args;
};

const stringifySearchParams = (searchParams: QueryParams): string => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    console.log(value);
    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value !== undefined) {
      urlSearchParams.append(key, value);
    }
  });

  return urlSearchParams.toString();
};

const updateSearchParams = ({
  key,
  value,
  searchParams,
  pathname,
  callback,
  resetPagination = true
}: {
  key: QueryParamKeys;
  value: string | string[];
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  callback: (href: string, options?: any) => void;
  resetPagination?: boolean;
}) => {
  const params = new URLSearchParams(searchParams);

  if (resetPagination) {
    params.delete("page");
  }

  if (value.length === 0) {
    params.delete(key);
  } else {
    if (typeof value == "string") {
      params.set(key, value);
    } else {
      params.delete(key);
      value.forEach((item) => {
        params.append(key, item);
      });
    }
  }

  callback(`${pathname}?${params.toString()}`, { scroll: true });
};

const slugify = (s: string) => {
  return s
    .toLocaleLowerCase()
    .trim()
    .replace(/[^\w\s.-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const sleep = async (time: number = 1000) =>
  await new Promise((resolve) => setTimeout(resolve, time));

export {
  limit,
  createDBArgs,
  sleep,
  slugify,
  stringifySearchParams,
  updateSearchParams
};
