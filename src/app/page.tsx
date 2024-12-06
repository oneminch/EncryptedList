import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Filter from "@/components/products/product-filter";
import ProductList from "@/components/products/product-list";
import Pagination from "@/components/products/product-pagination";
import GenericError from "@/components/shared/generic-error";
import pageMeta from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { stringifySearchParams as stringify } from "@/lib/utils";
import { getProducts, getTags } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: pageMeta["/"].title },
  description: pageMeta["/"].description,
  openGraph: {
    title: pageMeta["/"].minimalTitle,
    description: pageMeta["/"].description
  },
  twitter: {
    title: pageMeta["/"].minimalTitle,
    description: pageMeta["/"].description
  }
};

export default async function HomePage({
  searchParams
}: {
  searchParams: QueryParams;
}) {
  const [
    { products, totalPages, error: productError },
    { tags, error: tagError }
  ] = await Promise.all([getProducts(stringify(searchParams)), getTags()]);

  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero />
      </section>
      <section
        id="main-content"
        className="flex flex-col md:flex-row items-start gap-2">
        {tags.length > 0 || tagError !== null ? (
          <Filter className="shrink-0" tags={tags} />
        ) : (
          <GenericError message="Error Fetching Tags." />
        )}

        <section className="w-full min-w-60 flex-[1]">
          {products !== null || productError === undefined ? (
            <>
              <ProductList products={products} />
              {totalPages !== null && (
                <Pagination totalPages={totalPages} disabled={false} />
              )}
            </>
          ) : (
            <GenericError message={productError} />
          )}
        </section>
      </section>
    </>
  );
}
