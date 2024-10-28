import SearchStatusCard from "../search/SearchStatusCard";
import ProductListItem from "./ProductListItem";
import type { Product } from "@/lib/types";

export default async function ProductList({
  products
}: {
  products: Product[] | null;
}) {
  return (
    <ul className="border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-4 py-2 rounded-lg">
      <SearchStatusCard />

      {products &&
        products.map((item: Product) => (
          <ProductListItem product={item} key={item.name} />
        ))}
    </ul>
  );
}
