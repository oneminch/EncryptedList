import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import pageMeta from "@/lib/metadata";

export const metadata: Metadata = {
  title: pageMeta["/submit"].title,
  description: pageMeta["/submit"].description,
  openGraph: {
    title: pageMeta["/submit"].title,
    description: pageMeta["/submit"].description
  },
  twitter: {
    title: pageMeta["/submit"].title,
    description: pageMeta["/submit"].description
  }
};

export default function SubmitPage(): React.ReactNode {
  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero />
      </section>
      <section>This is where you submit new items.</section>
      <section id="main-content">
        <form>
          <label>
            <p>Product Name</p>
            <input id="product-name" type="text" name="Name" />
          </label>
        </form>
      </section>
    </>
  );
}
