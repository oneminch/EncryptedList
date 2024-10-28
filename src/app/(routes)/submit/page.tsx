import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";

export const metadata: Metadata = {
  title: pageMeta["/submit"].title,
  description: pageMeta["/submit"].description
};

export default function SubmitPage({}) {
  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero withLogo />
      </section>
      <section>This is where you submit new items.</section>
      <section>
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
