import { Icon } from "@iconify/react";
import Image from "next/image";

interface PromotionProps {
  iconUrl: string;
  title: string;
  description: string;
  cta: { label: string; url: string };
  tailwindBackgroundColorVariable?: string;
  tailwindForegroundColorVariable?: string;
}

const PromoBanner: React.FC<PromotionProps> = ({
  iconUrl,
  title,
  description,
  cta = { label: "Learn More", url: "#" },
  tailwindBackgroundColorVariable = "--color-yellow-500",
  tailwindForegroundColorVariable = "--color-zinc-800"
}) => {
  return (
    <div
      style={{
        // @ts-ignore
        "--bg-color-variable": `var(${tailwindBackgroundColorVariable})`,
        "--fg-color-variable": `var(${tailwindForegroundColorVariable})`
      }}
      className={`isolate flex items-center gap-x-2 w-full h-auto max-w-5xl mx-auto py-2 px-4 mb-2 border-[0.9px] border-t-0 border-zinc-400 dark:border-(--bg-color-variable)/50 bg-white dark:bg-zinc-900 rounded-b-lg cursor-pointer ring-2 ring-(--bg-color-variable)/10 dark:ring-transparent hover:ring-(--bg-color-variable)/25 relative`}>
      <span
        title="Promo"
        className={`flex items-center justify-center size-6 text-(--bg-color-variable) rounded-md shrink-0`}>
        <Icon icon="ph:shooting-star-duotone" className="size-4" />
      </span>
      <p className="w-0 h-6 border-x-[0.75px] border-zinc-300 dark:border-zinc-700 rounded-full"></p>
      <Image
        src={iconUrl}
        alt="Promotion Icon"
        className="size-6 rounded-lg"
        width={24}
        height={24}
      />
      <div className="flex flex-col items-start gap-y-1 sm:flex-row sm:items-center sm:gap-x-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p
          className={`hidden sm:inline-block text-xs text-(--bg-color-variable) dark:text-(--bg-color-variable)`}>
          {" "}
          &bull;{" "}
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <a
        href={cta.url}
        target="_blank"
        rel="noopener"
        className={`ml-auto shrink-0 inline-flex items-center justify-center gap-x-1 size-6 sm:size-auto p-1 sm:px-4 sm:py-1 text-xs font-medium text-(--fg-color-variable) bg-(--bg-color-variable) rounded-full focus-visible:global-focus`}
        title={`${cta.label} - ${title}`}
        aria-label={`${cta.label} - ${title}`}>
        <span className="z-10 absolute inset-0"></span>
        <span className="hidden sm:inline-block">{cta.label}</span>
        <Icon icon="ph:arrow-up-right" />
      </a>
    </div>
  );
};

export default PromoBanner;
