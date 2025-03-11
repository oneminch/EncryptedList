import ProductItem from "@/components/products/product-item";
import SearchStatus from "@/components/search/search-status";
import type { Product } from "@/lib/types";
import { Icon } from "@iconify/react";

export default function ProductList({
  products
}: {
  products: Product[];
}): React.ReactNode {
  return (
    <ul className="w-full px-2 md:px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <SearchStatus />

      {products.length > 0 ? (
        products.map((item: Product) => (
          <ProductItem product={item} key={item.id} />
        ))
      ) : (
        <li className="w-full p-8 flex flex-col items-center gap-y-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
          <Icon
            icon="heroicons:magnifying-glass-20-solid"
            className="text-5xl"
          />
          <h3 className="text-2xl font-bold">No Products Found.</h3>
          <p className="text-lg">Try refining your search or selected tags.</p>
        </li>
      )}
    </ul>
  );
}
