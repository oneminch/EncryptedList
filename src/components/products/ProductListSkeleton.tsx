import ProductListItemSkeleton from "./ProductListItemSkeleton";

export default async function ProductListSkeleton() {
  return (
    <ul className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-5 py-4 rounded-lg">
      {Array.from({ length: 3 }, (e, i) => i).map((item) => (
        <ProductListItemSkeleton key={item} />
      ))}
    </ul>
  );
}
