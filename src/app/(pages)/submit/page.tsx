import type { Metadata } from "next";
import { metadata as pageMeta } from "@/app/lib/metadata";

export const metadata: Metadata = {
  title: pageMeta["/submit"].title,
  description: pageMeta["/submit"].description
};

export default function SubmitPage() {
  return (
    <article>
      <section>This is where you submit new items.</section>
      <section>
        <form>
          <label>
            <p>Product Name</p>
            <input id="product-name" type="text" name="Name" />
          </label>
        </form>
      </section>
    </article>
  );
}
