import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Filter from "@/components/products/product-filter";
import ProductList from "@/components/products/product-list";
import Pagination from "@/components/products/product-pagination";
import GenericError from "@/components/shared/generic-error";
import { queryProducts } from "@/lib/data";
import pageMeta from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { stringify } from "@/lib/utils";

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
  // const [, ,] = await Promise.all([])
  // await new Promise((resolve) => setTimeout(resolve, 60000));

  const { products, total, error } = await queryProducts(
    stringify(searchParams)
  );

  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero withLogo />
      </section>
      <section
        id="main-content"
        className="flex flex-col md:flex-row items-start gap-2">
        <Filter className="shrink-0" />

        <section className="min-w-60 flex-[1]">
          {error || products === null ? (
            <GenericError message={error} />
          ) : (
            <>
              <ProductList products={products} />
              {total !== null && products.length > 0 && (
                <Pagination totalPages={total} disabled={false} />
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
}
