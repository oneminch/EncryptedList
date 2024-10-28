import { Suspense } from "react";
import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { stringifySearchParams } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Filter from "@/components/filter/Filter";
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
        className="md:grid md:grid-cols-[16rem_minmax(240px,_1fr)] lg:grid-cols-[16rem_minmax(360px,_1fr)] md:gap-2 space-y-2 md:space-y-0">
        <Filter />

        <Suspense>
          <ProductListWrapper urlSearchParams={urlSearchParams} />
        </Suspense>
      </section>
    </>
  );
}
