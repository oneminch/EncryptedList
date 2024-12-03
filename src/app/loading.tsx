import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import ProductFilterSkeleton from "@/components/products/product-filter-skeleton";
import ProductListSkeleton from "@/components/products/product-list-skeleton";

export default function LoadingPage() {
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
        <ProductFilterSkeleton />

        <section className="min-w-60 w-full">
          <ProductListSkeleton />
        </section>
      </section>
    </>
  );
}
