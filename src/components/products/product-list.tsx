import ProductItem from "@/components/products/product-item";
import SearchStatus from "@/components/search/search-status";
import type { Product } from "@/lib/types";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-4 py-2 rounded-lg">
      <SearchStatus />

      {products.length > 0 ? (
        products.map((item: Product) => (
          <ProductItem product={item} key={item.name} />
        ))
      ) : (
        <li className="w-full p-8 bg-transparent flex flex-col gap-y-4 text-center text-zinc-600 dark:text-zinc-400">
          <h2 className="text-5xl">🔍</h2>
          <h3 className="text-2xl font-bold">No Products Found.</h3>
          <p className="text-lg">Try refining your search or selected tags.</p>
        </li>
      )}
    </ul>
  );
}
