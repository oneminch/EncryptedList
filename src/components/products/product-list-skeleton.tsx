import ProductItemSkeleton from "@/components/products/product-item-skeleton";

export default function ProductListSkeleton() {
  return (
    <ul className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-4 py-2 rounded-lg">
      {Array.from({ length: 3 }, (e, i) => i).map((item) => (
        <ProductItemSkeleton key={item} />
      ))}
    </ul>
  );
}
