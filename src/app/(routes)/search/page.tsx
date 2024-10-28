import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import ProductSearch from "@/components/search/ProductSearch";

export const metadata: Metadata = {
  title: pageMeta["/search"].title,
  description: pageMeta["/search"].description
};

export default function SearchPage() {
  return (
    <section
      id="main-content"
      className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 flex pb-20">
      <div className="bg-white/90 dark:bg-zinc-900/90 sm:bg-transparent sm:dark:bg-transparent pb-3 sm:absolute sm:top-1/4 w-full sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-y-4 overflow-auto sm:overflow-visible border-y border-zinc-200 dark:border-zinc-700 sm:border-none">
        <h2 className="mt-6 mb-2 text-center font-semibold text-2xl sm:text-3xl bg-transparent">
          Search
        </h2>
        <ProductSearch />
      </div>
    </section>
  );
}
