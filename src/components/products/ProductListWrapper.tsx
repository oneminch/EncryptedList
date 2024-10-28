import { queryProducts } from "@/lib/data";
import Pagination from "./Pagination";
import ProductListSkeleton from "./ProductListSkeleton";
import { Suspense } from "react";
import ProductList from "./ProductList";
import DataError from "../shared/DataError";

export default async function ProductListWrapper({
  urlSearchParams
}: {
  urlSearchParams: string;
}) {
  const { products, total, error } = await queryProducts(urlSearchParams);

  if (error) {
    return <DataError message={error} />;
  }

  return (
    <section>
      <Suspense key={urlSearchParams} fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
      {total && <Pagination totalPages={total} disabled={false} />}
    </section>
  );
}
