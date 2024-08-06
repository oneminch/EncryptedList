import { QueryParams } from "./types";

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

export { stringifySearchParams };
