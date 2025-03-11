import Image from "next/image";
import type { Product } from "@/lib/types";
import { Icon } from "@iconify/react";
import { slugify } from "@/lib/utils";
import ProductItemOptions from "./product-item-options";

export default function ProductItem({
  product
}: {
  product: Product;
}): React.ReactNode {
  return (
    <li className="w-full px-5 pt-4 pb-6 flex flex-col gap-y-3 border-[0.75px] border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg hover:ring-2 hover:ring-zinc-200/75 dark:hover:ring-zinc-800/75 group relative overflow-hidden">
      <div className="flex items-center gap-x-3 relative">
        <Image
          className="w-9 z-30 p-0.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg aspect-square object-contain grow-0 shrink-0 overflow-hidden text-xs text-center ring-[0.75px] ring-zinc-300 dark:ring-zinc-700"
          src={`https://icons.encryptedlist.xyz/icons/apps/${slugify(
            product.name
          )}.png`}
          width={36}
          height={36}
          alt={`Logo for ${product.name}`}
        />
        <div className="flex flex-col items-start gap-y-2 z-30">
          <a
            href={`${product.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener"
            title="Open Website in New Tab"
            className="flex items-center gap-x-1 font-medium group focus-visible:underline group-hover:underline underline-offset-2 decoration-yellow-500 rounded-xs focus-visible:global-focus">
            {product.name}
            <Icon
              icon="heroicons:arrow-up-right-20-solid"
              className="text-lg text-zinc-500 dark:text-zinc-500 transition-all duration-75 scale-90 opacity-0 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:visible"
            />
          </a>
        </div>
      </div>

      <ProductItemOptions
        product={{
          name: product.name,
          hasAlternatives: product.has_alternatives === 1
        }}
      />

      <div className="z-10 text-sm h-full flex flex-col items-start justify-between gap-y-4 relative">
        <p className="rounded-lg text-zinc-700 dark:text-zinc-300">
          {product.description}
        </p>

        <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center flex-wrap gap-1">
          {product.tags.split(",").map((tag: string) => (
            <span
              className="text-xs shrink-0 px-3 py-0.5 rounded-full flex items-center justify-center font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}
