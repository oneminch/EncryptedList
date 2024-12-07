import type { SearchProduct } from "@/lib/types";
import Image from "next/image";

export default function SearchItem({
  product
}: {
  product: SearchProduct;
}): React.ReactNode {
  return (
    <li
      className="w-full px-4 py-3 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col gap-y-4 focus:outline-none group"
      tabIndex={0}>
      <div className="flex items-center gap-x-4">
        <Image
          className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-8 w-8 shrink-0 overflow-hidden group-focus:outline group-focus:outline-red-300"
          src={product.icon || "https://cdn.dummyjson.com/recipe-images/1.webp"}
          width={32}
          height={32}
          alt={`Product Icon for ${product.name}`}
        />
        <div className="flex flex-col gap-y-1">
          <p className="font-medium">{product.name}</p>
        </div>
      </div>
    </li>
  );
}
