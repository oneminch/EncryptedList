import { Icon } from "@iconify/react";
import { type AppListPromotion } from "@/lib/types";

type PromotionProps = AppListPromotion;

const PromoCard: React.FC<PromotionProps> = ({
  iconUrl,
  title,
  longDescription,
  cta = { label: "Learn More", url: "#" },
  tailwindBackgroundColorVariable = "--color-yellow-500",
  tailwindForegroundColorVariable = "--color-zinc-800"
}) => {
  return (
    <li
      style={{
        // @ts-ignore
        "--bg-color-variable": `var(${tailwindBackgroundColorVariable})`,
        "--fg-color-variable": `var(${tailwindForegroundColorVariable})`
      }}
      className="isolate w-full min-h-52 px-5 pt-4 pb-6 flex flex-col gap-y-3 border-[0.9px] border-zinc-400 dark:border-(--bg-color-variable)/50 bg-white dark:bg-zinc-900/50 rounded-lg ring-2 ring-(--bg-color-variable)/10 dark:ring-transparent hover:ring-(--bg-color-variable)/25 relative *:-z-0 dark:after:glowing-card">
      <div className="w-[calc(100%-1.85rem)] flex flex-col items-start md:flex-row md:items-center gap-2 relative">
        <img
          className="w-8 p-0.5 bg-zinc-50/50 dark:bg-zinc-950/50 rounded-lg aspect-square object-contain grow-0 shrink-0 overflow-hidden text-xs text-center border-[0.9px] border-zinc-300 dark:border-zinc-700"
          src={iconUrl}
          width={36}
          height={36}
          alt={`Logo for ${title}`}
        />
        <p className="flex flex-col items-start gap-y-2 overflow-x-hidden">
          {title}
        </p>
      </div>

      <span className="absolute right-5 -top-3 text-xs font-medium flex items-center justify-center gap-x-1 h-6 py-0.5 px-3 text-(--bg-color-variable) bg-white dark:bg-zinc-950 border-[0.9px] border-inherit rounded-full shrink-0">
        Promo
        <Icon icon="ph:shooting-star-duotone" className="size-4" />
      </span>

      <div className="text-sm w-full *:w-full h-full flex flex-col items-start justify-between gap-y-4">
        <p className="rounded-lg text-zinc-700 dark:text-zinc-300">
          {longDescription}
        </p>

        <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center">
          <a
            href={`${cta.url}?ref=encryptedlist.xyz`}
            target="_blank"
            rel="noopener"
            className={`w-full grow shrink-0 flex items-center justify-center gap-x-1 size-6 sm:size-auto p-2 sm:px-4 sm:py-1 text-sm font-medium text-(--fg-color-variable) bg-(--bg-color-variable) rounded-full focus-visible:global-focus`}
            title={`${cta.label} - ${title} (Promo)`}
            aria-label={`${cta.label} - ${title} (Promo)`}>
            <span className="z-10 absolute inset-0"></span>
            <span>{cta.label}</span>
            <Icon icon="ph:arrow-up-right" />
          </a>
        </div>
      </div>
    </li>
  );
};

export default PromoCard;
