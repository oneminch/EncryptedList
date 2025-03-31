import AppItem from "@/components/apps/app-item";
import SearchStatus from "@/components/search/search-status";
import type { App } from "@/lib/types";
import { Icon } from "@iconify/react";
import PromoCard from "../misc/promotional/promo-card";
import { AppListPromotion } from "@/lib/types";

type AppListProps = { apps: App[] };

const AppList: React.FC<AppListProps> = ({ apps }) => {
  const promoInfo = {
    iconUrl: "https://icons.encryptedlist.xyz/logo.svg",
    title: "EncryptedList",
    longDescription:
      "Discover apps that are secure-by-design, and protect your privacy by default.",
    cta: {
      label: "Learn More",
      url: "https://encryptedlist.xyz/"
    },
    tailwindBackgroundColorVariable: "--color-yellow-500",
    tailwindForegroundColorVariable: "--color-zinc-800"
  } satisfies AppListPromotion;

  const appsWithPromo = apps.flatMap((item, index) =>
    index === 1 ? [item, { isPromo: true, promoInfo }] : [item]
  );

  return (
    <>
      <SearchStatus />
      <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appsWithPromo.length > 0 ? (
          appsWithPromo.map((item: any) =>
            item.isPromo ? (
              <PromoCard {...item.promoInfo} key={item.promoInfo.title} />
            ) : (
              <AppItem app={item as App} key={(item as App).id} />
            )
          )
        ) : (
          <li className="col-span-full w-full p-8 flex flex-col items-center gap-y-4 text-center text-zinc-500 dark:text-zinc-500">
            <Icon icon="ph:magnifying-glass-duotone" className="text-5xl" />
            <h3 className="text-2xl font-bold">No Apps Found.</h3>
            <p>Try refining your search or selected tags.</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default AppList;
