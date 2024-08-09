import { ReadonlyURLSearchParams } from "next/navigation";
import { QueryParamKeys, QueryParams } from "./types";

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
  value: string;
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  callback: Function;
  resetPagination?: boolean;
}) => {
  const params = new URLSearchParams(searchParams);

  if (resetPagination) {
    params.delete("page");
  }

  if (value.length > 0) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  callback(`${pathname}?${params.toString()}`, { scroll: false });
};

export { stringifySearchParams, updateSearchParams };
