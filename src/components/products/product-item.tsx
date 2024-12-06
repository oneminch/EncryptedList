import Image from "next/image";
import type { Product } from "@/lib/types";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <li className="w-full p-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 bg-transparent flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <Image
          className="bg-zinc-200 rounded-full h-12 w-12 shrink-0 overflow-hidden text-xs text-center"
          src={product.icon || "https://cdn.dummyjson.com/recipe-images/1.webp"}
          width={48}
          height={48}
          alt={`Logo for ${product.name}`}
        />
        <div className="flex flex-col gap-y-2">
          <div className="font-medium">{product.name}</div>
          <div className="flex items-center gap-x-1">
            {product.tags &&
              product.tags.split(",").map((tag: string) => (
                <span
                  className="text-xs font-medium px-3 py-0.5 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700"
                  key={tag}>
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-lg text-zinc-600 dark:text-zinc-400">
          {product.description}
        </div>
      </div>
    </li>
  );
}
