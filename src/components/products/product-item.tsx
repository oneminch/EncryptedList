import Image from "next/image";
import type { Product } from "@/lib/types";
import { Icon } from "@iconify/react";
import Modal from "../shared/modal";
import { slugify } from "@/lib/utils";
import Alternatives from "./product-alternatives-list";

export default function ProductItem({
  product
}: {
  product: Product;
}): React.ReactNode {
  return (
    <li className="w-full px-2 py-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 bg-transparent flex flex-col gap-y-2 group">
      <div className="flex items-center gap-x-3 relative">
        <Image
          className="bg-zinc-200 rounded-lg h-full aspect-square shrink-0 overflow-hidden text-xs text-center"
          src={`https://icons.encryptedlist.xyz/icons/apps/signal.png`}
          // `https://icons.encryptedlist.xyz/icons/apps/${slugify(product.name)}.png`
          width={45}
          height={45}
          alt={`Logo for ${product.name}`}
        />
        <div className="flex flex-col items-start gap-y-1.5">
          <a
            href={`${product.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener"
            title="Open Website in New Tab"
            className="flex items-center gap-x-1 font-medium group focus-visible:underline group-hover:underline underline-offset-2 decoration-yellow-500 rounded-xs focus-visible:global-focus">
            {product.name}
            <Icon
              icon="heroicons:arrow-up-right-20-solid"
              className="text-lg text-zinc-500 dark:text-zinc-500 transition-all duration-75 translate-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:visible"
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
        <div className="absolute top-0 right-0 w-6 flex flex-col items-center gap-1.5 *:transition-transform *:duration-200 *:last:delay-75! *:translate-x-1 *:opacity-0 *:invisible group-hover:*:opacity-100 group-hover:*:translate-x-0 group-hover:*:visible group-focus-within:*:opacity-100 group-focus-within:*:translate-x-0 group-focus-within:*:visible">
          <Modal
            title="Report Product"
            triggerContent={<Icon icon="heroicons:flag-20-solid" />}
            triggerClasses="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-yellow-500 focus-visible:global-focus">
            <Alternatives productName={product.name} />
          </Modal>
          <Modal
            title="Alternatives"
            triggerContent={
              <Icon icon="heroicons:arrows-right-left-20-solid" />
            }
            triggerClasses="flex items-center justify-center w-6 h-full rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-yellow-500 focus-visible:global-focus">
            <Alternatives productName={product.name} />
          </Modal>
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
