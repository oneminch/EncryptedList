import type { SearchProduct } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function SearchItem({
  product
}: {
  product: SearchProduct;
}): React.ReactNode {
  return (
    <li className="w-full p-3 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col gap-y-4 group">
      <div className="flex items-center gap-x-4">
        <Image
          className="p-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg aspect-square object-contain shrink-0 overflow-hidden text-xs text-center ring-1 ring-zinc-300 dark:ring-zinc-700 h-8 w-8 group-focus:outline group-focus:outline-red-300"
          src={`https://icons.encryptedlist.xyz/icons/apps/${slugify(
            product.name
          )}.png`}
          width={32}
          height={32}
          alt={`Product Icon for ${product.name}`}
        />
        <div className="flex flex-col items-start gap-y-1">
          <a
            href={`${product.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-x-2 font-medium group focus-visible:underline group-hover:underline underline-offset-2 decoration-yellow-500 rounded-xs focus-visible:global-focus">
            {product.name}
            <Icon
              icon="heroicons:arrow-up-right-20-solid"
              className="hidden text-lg group-focus-visible:inline-block group-hover:inline-block text-zinc-500 dark:text-zinc-500"
            />
          </a>
        </div>
      </div>
    </li>
  );
}
