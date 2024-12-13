import type { SearchProduct } from "@/lib/types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function SearchItem({
  product
}: {
  product: SearchProduct;
}): React.ReactNode {
  return (
    <li className="w-full px-4 py-3 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col gap-y-4 group">
      <div className="flex items-center gap-x-4">
        <Image
          className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-8 w-8 shrink-0 overflow-hidden group-focus:outline group-focus:outline-red-300"
          src={
            product.icon || "https://icons.encryptedlist.xyz/icons/apps/mega.png"
          }
          width={32}
          height={32}
          alt={`Product Icon for ${product.name}`}
        />
        <div className="flex flex-col items-start gap-y-1">
          <Link
            href={product.url}
            className="flex items-center gap-x-2 font-medium group focus-visible:underline group-hover:underline underline-offset-2 decoration-dashed decoration-yellow-500 rounded-sm focus-visible:global-focus">
            {product.name}
            <Icon
              icon="heroicons:link-20-solid"
              className="hidden text-lg group-focus-visible:inline-block group-hover:inline-block text-zinc-500 dark:text-zinc-500"
            />
          </Link>
        </div>
      </div>
    </li>
  );
}
