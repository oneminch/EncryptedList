interface ApiResponse {
  recipes: Product[];
  total: number;
}

interface FetchResult {
  products: Product[] | null;
  total: number | null;
  error: string | null;
}

interface ProductResultSet {
  products: Product[];
  total?: number | null;
  error?: string;
}

interface Product {
  id: string;
  icon: string;
  name: string;
  tags: string;
  description: string;
}

interface QueryParams {
  page?: number;
  query?: string;
  sort?: string;
  tag?: string[];
}

interface DBArgTypes {
  query: string | null;
  sort: string | null;
  tags: string | null;
  limit: number;
  offset: number;
}

type QueryParamKeys = keyof QueryParams;

export type {
  ApiResponse,
  DBArgTypes,
  ProductResultSet,
  FetchResult,
  Product,
  QueryParams,
  QueryParamKeys
};
