import { Suspense } from "react";
import Filter from "@/components/filter/Filter";
import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { stringifySearchParams } from "@/lib/utils";
import ProductListWrapper from "@/components/products/ProductListWrapper";

export const metadata: Metadata = {
  title: { absolute: pageMeta["/"].title },
  description: pageMeta["/"].description
};

export default async function HomePage({
  searchParams
}: {
  searchParams: QueryParams;
}) {
  const urlSearchParams = stringifySearchParams(searchParams);

  return (
    <div
      id="main-content"
      className="md:grid md:grid-cols-[16rem_minmax(240px,_1fr)] lg:grid-cols-[16rem_minmax(360px,_1fr)] md:gap-2 space-y-2 md:space-y-0"
    >
      <Filter className="hidden md:flex" />

      <Suspense>
        <ProductListWrapper urlSearchParams={urlSearchParams} />
      </Suspense>
    </div>
  );
}
