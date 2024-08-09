import { queryProducts } from "@/lib/data";
import Pagination from "./Pagination";
import ProductListSkeleton from "./ProductListSkeleton";
import { Suspense } from "react";
import ProductList from "./ProductList";

export default async function ProductListWrapper({
  urlSearchParams
}: {
  urlSearchParams: string;
}) {
  const { products, total, error } = await queryProducts(urlSearchParams);

  return (
    <div>
      <Suspense key={urlSearchParams} fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
      {total && <Pagination totalPages={total / 10} />}
    </div>
  );
}
