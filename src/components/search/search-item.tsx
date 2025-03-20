import type { SearchApp } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface SearchItemProps {
  app: SearchApp;
}

const SearchItem: React.FC<SearchItemProps> = ({ app }) => {
  return (
    <li className="w-full p-3 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col gap-y-4 group">
      <div className="flex items-center gap-x-4">
        <Image
          className="w-8 p-0.5 bg-zinc-50/50 dark:bg-zinc-950/50 rounded-lg aspect-square object-contain grow-0 shrink-0 overflow-hidden text-xs text-center border-[0.9px] border-zinc-300 dark:border-zinc-700"
          src={`https://icons.encryptedlist.xyz/icons/apps/${slugify(
            app.name
          )}.png`}
          width={32}
          height={32}
          alt={`App Icon for ${app.name}`}
        />
        <div className="flex flex-col items-start gap-y-1">
          <a
            href={`${app.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-2 font-medium group underline sm:no-underline sm:focus-visible:underline sm:group-hover:underline underline-offset-2 decoration-yellow-500 rounded-xs focus-visible:global-focus">
            {app.name}
            <Icon
              icon="ph:arrow-up-right"
              className="inline-block sm:hidden text-lg group-focus-visible:inline-block group-hover:inline-block text-zinc-600 dark:text-zinc-400"
            />
          </a>
        </div>
      </div>
    </li>
  );
};

export default SearchItem;
