import ProductListItem from "./ProductListItem";

export default async function ProductList({
  total,
  products
}: {
  total: number;
  products: any;
}) {
  return (
    <>
      <ul className="border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-5 py-4 rounded-lg">
        {products?.map((item: any) => (
          <ProductListItem product={item} key={item} />
        ))}
      </ul>
      {/* Pagination */}
      <p>{total}</p>
    </>
  );
}
