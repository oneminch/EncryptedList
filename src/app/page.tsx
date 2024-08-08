import { Suspense } from "react";
import Filter from "@/components/filter/Filter";
import ProductList from "@/components/products/ProductList";
import ProductListSkeleton from "@/components/products/ProductListSkeleton";
import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { stringifySearchParams } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: pageMeta["/"].title },
  description: pageMeta["/"].description
};

async function getProducts(params: string) {
  const fetchParams = params.length > 0 ? `?${params}` : "";
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products${fetchParams}`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("Failed to Fetch Products");
    }

    return res.json();
  } catch (error) {
    return error;
  }
}

export default async function HomePage({
  searchParams
}: {
  searchParams: QueryParams;
}) {
  const urlSearchParams = stringifySearchParams(searchParams);

  const { products, total } = await getProducts(urlSearchParams);

  return (
    <div className="md:grid md:grid-cols-[16rem_minmax(240px,_1fr)] lg:grid-cols-[16rem_minmax(360px,_1fr)] md:gap-2 space-y-2 md:space-y-0">
      <Filter className="hidden md:flex" />

      <Suspense key={searchParams.sort} fallback={<ProductListSkeleton />}>
        <ProductList total={total} products={products} />
      </Suspense>
    </div>
  );
}
