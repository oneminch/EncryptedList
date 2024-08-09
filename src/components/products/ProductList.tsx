import { queryProducts } from "@/lib/data";
import ProductListItem from "./ProductListItem";
import type { Product } from "@/lib/types";
import Pagination from "./Pagination";

export default async function ProductList({
  urlSearchParams
}: {
  urlSearchParams: string;
}) {
  const { products, total, error } = await queryProducts(urlSearchParams);

  return (
    <div>
      <ul className="border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-4 py-2 rounded-lg">
        {products?.map((item: Product) => (
          <ProductListItem product={item} key={item.name} />
        ))}
      </ul>
      {total && <Pagination totalPages={total / 10} />}
    </div>
  );
}
