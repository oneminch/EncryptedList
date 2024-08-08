import { queryProducts } from "@/lib/data";
import ProductListItem from "./ProductListItem";
import type { Product } from "@/lib/types";

export default async function ProductList({
  urlSearchParams
}: {
  urlSearchParams: string;
}) {
  const { products, total, error } = await queryProducts(urlSearchParams);

  return (
    <>
      <ul className="border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-5 py-4 rounded-lg">
        {products?.map((item: Product) => (
          <ProductListItem product={item} key={item.name} />
        ))}
      </ul>
      {/* Pagination */}
      <p>{total}</p>
    </>
  );
}
