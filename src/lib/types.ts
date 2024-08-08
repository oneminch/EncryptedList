interface ApiResponse {
  recipes: Product[];
  total: number;
}

interface FetchResult {
  products: Product[] | null;
  total: number | null;
  error?: string;
}

interface Product {
  image: string;
  name: string;
  tags: string[];
  instructions: string[];
}

interface QueryParams {
  page?: number;
  query?: string;
  sort?: string;
  tags?: string[];
}

export type { ApiResponse, FetchResult, Product, QueryParams };
