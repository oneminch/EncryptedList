import Image from "next/image";
import type { Product } from "@/lib/types";
import { Icon } from "@iconify/react";
import { slugify } from "@/lib/utils";

export default function ProductItem({
  product
}: {
  product: Product;
}): React.ReactNode {
  return (
    <li className="w-full px-2 py-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 bg-transparent flex flex-col gap-y-4 group">
      <div className="flex items-center gap-x-4">
        <Image
          className="bg-zinc-200 rounded-lg h-12 w-12 shrink-0 overflow-hidden text-xs text-center"
          src={`https://icons.encryptedlist.xyz/icons/apps/signal.png`}
          // `https://icons.encryptedlist.xyz/icons/apps/${slugify(product.name)}.png`
          width={48}
          height={48}
          alt={`Logo for ${product.name}`}
        />
        <div className="flex flex-col items-start gap-y-2">
          <a
            href={`${product.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-x-2 font-medium group focus-visible:underline group-hover:underline underline-offset-2 decoration-dashed decoration-yellow-500 rounded-sm focus-visible:global-focus">
            {product.name}
            <Icon
              icon="heroicons:link-20-solid"
              className="hidden text-lg group-focus-visible:inline-block group-hover:inline-block text-zinc-500 dark:text-zinc-500"
            />
          </a>

          <div className="flex items-center gap-x-1">
            {product.tags.split(",").map((tag: string) => (
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
