import AppItem from "@/components/apps/app-item";
import SearchStatus from "@/components/search/search-status";
import type { App } from "@/lib/types";
import { Icon } from "@iconify/react";

type AppListProps = { apps: App[] };

const AppList: React.FC<AppListProps> = ({ apps }) => {
  return (
    <>
      <SearchStatus />
      <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.length > 0 ? (
          apps.map((item: App) => <AppItem app={item} key={item.id} />)
        ) : (
          <li className="w-full p-8 flex flex-col items-center gap-y-4 text-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
            <Icon icon="ph:magnifying-glass-duotone" className="text-5xl" />
            <h3 className="text-2xl font-bold">No Apps Found.</h3>
            <p className="text-lg">
              Try refining your search or selected tags.
            </p>
          </li>
        )}
      </ul>
    </>
  );
};

export default AppList;
