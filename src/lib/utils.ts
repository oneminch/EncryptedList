import { type ReadonlyURLSearchParams } from "next/navigation";
import { QueryParamKeys, QueryParams } from "@/lib/types";

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

  callback(`${pathname}?${params.toString()}`, { scroll: false });
};

export { stringifySearchParams as stringify, updateSearchParams };
