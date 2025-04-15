interface ApiResponse {
  recipes: App[];
  total: number;
}

interface FetchResult {
  apps: App[] | null;
  total: number | null;
  error: string | null;
}

interface SubmissionFormData {
  appName: string;
  appUrl: string;
  optionalMessage: string;
}

interface AppResultSet {
  apps: App[];
  totalPages: number | null;
  error?: string;
}

interface App {
  id: string;
  name: string;
  tags: string;
  description: string;
  url: string;
  has_alternatives: number;
  is_featured: number;
}

type SearchApp = Omit<App, "tags" | "description" | "has_alternatives">;

interface SearchResults {
  count: number;
  searchResults: SearchApp[];
}

interface ReportResults {
  message: string;
}

interface QueryParams {
  page?: number;
  query?: string;
  sort?: string;
  tag?: string;
}

interface DBArgTypes {
  query: string | null;
  sort: string | null;
  tags: string | null;
  limit: number;
  offset: number;
}

type QueryParamKeys = keyof QueryParams;

interface Promotion {
  iconUrl: string;
  title: string;
  cta: { label: string; url: string };
  tailwindBackgroundColorVariable?: string;
  tailwindForegroundColorVariable?: string;
}

interface BannerPromotion extends Promotion {
  shortDescription: string;
}

interface AppListPromotion extends Promotion {
  longDescription: string;
}

export type {
  ApiResponse,
  DBArgTypes,
  AppResultSet,
  FetchResult,
  App,
  QueryParams,
  QueryParamKeys,
  SearchApp,
  SearchResults,
  SubmissionFormData,
  ReportResults,
  BannerPromotion,
  AppListPromotion
};
