import { Suspense } from "react";
import Filter from "@/components/filter/Filter";
import ProductList from "@/components/products/ProductList";
import ProductListSkeleton from "@/components/products/ProductListSkeleton";
import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";

export const metadata: Metadata = {
  title: { absolute: pageMeta["/"].title },
  description: pageMeta["/"].description
};

export default function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
    tags?: string;
  };
}) {
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const page = Number(searchParams?.page) || 1;
  const tags = searchParams?.tags?.split(",") || [];

  return (
    <div className="md:grid md:grid-cols-[16rem_minmax(240px,_1fr)] lg:grid-cols-[16rem_minmax(360px,_1fr)] md:gap-2 space-y-2 md:space-y-0">
      <Filter className="hidden md:flex" />

      <Suspense key={query + page} fallback={<ProductListSkeleton />}>
        <ProductList query={query} sort={sort} currentPage={page} tags={tags} />
      </Suspense>
    </div>
  );
}
