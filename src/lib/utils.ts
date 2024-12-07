import type { ReadonlyURLSearchParams } from "next/navigation";
import type { DBArgTypes, QueryParamKeys, QueryParams } from "@/lib/types";

const limit = 10;

const createDBArgs = (fetchParams: string) => {
  const searchParams = new URLSearchParams(fetchParams);

  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query");
  const sort = searchParams.get("sort");
  const tags = searchParams.getAll("tag");

  const args: DBArgTypes = {
    limit,
    offset: (page - 1) * limit,
    sort: sort?.toLocaleLowerCase() || null,
    query: query?.toLocaleLowerCase() || null,
    tags: tags && tags.length > 0 ? JSON.stringify(tags) : null
  };

  return args;
};

const stringifySearchParams = (searchParams: QueryParams): string => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
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

const sleep = async () =>
  await new Promise((resolve) => setTimeout(resolve, 60000));

export {
  limit,
  createDBArgs,
  sleep,
  stringifySearchParams,
  updateSearchParams
};
