import type { DBArgTypes, QueryParams } from "@/lib/types";

const limit = 14;

const createDBArgs = (fetchParams: QueryParams) => {
  const searchParams = new URLSearchParams(Object.entries(fetchParams));

  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query");
  const sort = searchParams.get("sort");
  const tags = searchParams.get("tag")?.split(",") || null;

  const args: DBArgTypes = {
    limit,
    offset: (page - 1) * limit,
    sort: sort?.toLocaleLowerCase() || null,
    query: query?.toLocaleLowerCase() || null,
    tags: tags ? JSON.stringify(tags) : null
  };

  return args;
};

const getIconBaseUrl = (width: number = 32) => {
  const quality = 85;

  return `https://icons.encryptedlist.xyz/cdn-cgi/image/width=${width},quality=${quality}/icons/`;
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

export { limit, createDBArgs, getIconBaseUrl, sleep, slugify };
