import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Filter from "@/components/products/product-filter";
import ProductListSkeleton from "@/components/products/product-list-skeleton";

export default function LoadingPage() {
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

        <section className="min-w-60 w-full">
          <ProductListSkeleton />
        </section>
      </section>
    </>
  );
}
