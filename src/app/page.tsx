import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Filter from "@/components/products/product-filter";
import ProductList from "@/components/products/product-list";
import Pagination from "@/components/products/product-pagination";
import GenericError from "@/components/shared/generic-error";
import pageMeta from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { stringify } from "@/lib/utils";
import { db as dbClient } from "@/lib/db";
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
  const [{ products, total, error: productError }, { tags, error: tagError }] =
    await Promise.all([
      await getProducts(dbClient, stringify(searchParams)),
      await getTags(dbClient)
    ]);

  // await new Promise((resolve) => setTimeout(resolve, 60000));

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
        {tags !== undefined || tagError !== null ? (
          <Filter className="shrink-0" tags={tags} />
        ) : (
          <GenericError message={tagError!} />
        )}

        <section className="w-full min-w-60 flex-[1]">
          {products !== null || productError === undefined ? (
            <>
              <ProductList products={products} />
              {total !== null && products.length > 0 && (
                <Pagination totalPages={total!} disabled={false} />
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
