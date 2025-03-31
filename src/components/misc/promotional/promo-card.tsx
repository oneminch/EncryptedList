import Image from "next/image";
import type { App } from "@/lib/types";
import { Icon } from "@iconify/react";
import { slugify } from "@/lib/utils";

interface AppItemProps {
  app: App;
}

const PromoCard: React.FC<AppItemProps> = ({ app }) => {
  return (
    <li className="w-full min-h-52 px-5 pt-4 pb-6 flex flex-col gap-y-3 border-[0.9px] border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg hover:ring-2 hover:ring-zinc-200/75 dark:hover:ring-zinc-800/75 group relative overflow-hidden">
      <div className="w-[calc(100%-1.85rem)] flex flex-col items-start md:flex-row md:items-center gap-2 relative">
        <Image
          className="w-8 z-30 p-0.5 bg-zinc-50/50 dark:bg-zinc-950/50 rounded-lg aspect-square object-contain grow-0 shrink-0 overflow-hidden text-xs text-center border-[0.9px] border-zinc-300 dark:border-zinc-700"
          src={`https://icons.encryptedlist.xyz/icons/apps/${slugify(
            app.name
          )}.png`}
          width={36}
          height={36}
          alt={`Logo for ${app.name}`}
        />
        <div className="flex flex-col items-start gap-y-2 z-10 md:z-30 overflow-x-hidden">
          <a
            href={`${app.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener noreferrer"
            title={`${app.name}: Open Website in New Tab`}
            className="w-full flex items-center gap-x-1 font-medium text-sm sm:text-base group external-link sm:no-underline focus-visible:external-link group-hover:external-link rounded-xs focus-visible:global-focus break-words">
            <span>{app.name}</span>
            <Icon
              icon="ph:arrow-up-right"
              className="text-lg text-yellow-500 dark:text-yellow-500 transition-all duration-75 scale-90 sm:opacity-0 sm:invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:visible"
            />
          </a>
        </div>
      </div>

      <div className="z-10 text-sm w-full *:w-full h-full flex flex-col items-start justify-between gap-y-4 relative">
        <p className="rounded-lg text-zinc-700 dark:text-zinc-300">
          {app.description}
        </p>

        <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center flex-wrap gap-1">
          {app.tags.split(",").map((tag: string) => (
            <span
              className="text-xs shrink-0 px-3 py-0.5 rounded-full flex items-center justify-center font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700/75 dark:text-zinc-300"
              key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
};

export default PromoCard;
