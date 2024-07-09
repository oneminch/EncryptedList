import { queryProducts } from "@/app/lib/products";
import ProductListItem from "./ProductListItem";

export default async function ProductList({
  sort,
  tags,
  query,
  currentPage
}: {
  sort: string;
  tags: string[];
  query: string;
  currentPage: number;
}) {
  const products = await queryProducts({ sort, tags, query, currentPage });

  // console.log("From ProductList", tags, sort, query, currentPage);

  return (
    <ul className="border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col px-5 py-4 rounded-lg">
      {products?.recipes?.map((item: any) => (
        <ProductListItem product={item} key={item} />
      ))}
    </ul>
  );
}
