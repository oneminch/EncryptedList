import ProductItemSkeleton from "@/components/skeletons/product-item-skeleton";

export default function ProductListSkeleton(): React.ReactNode {
  return (
    <ul className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-4 py-2 rounded-lg">
      {Array.from({ length: 3 }, (_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </ul>
  );
}
