import type { Metadata } from "next";
import dynamic from "next/dynamic";
import pageMeta from "@/lib/metadata";
import ThemeToggle from "@/components/shared/theme-toggle";

const Search = dynamic(() => import("@/components/search/search"), {
  ssr: false
});

export const metadata: Metadata = {
  title: pageMeta["/search"].title,
  description: pageMeta["/search"].description,
  openGraph: {
    title: pageMeta["/search"].title,
    description: pageMeta["/search"].description
  },
  twitter: {
    title: pageMeta["/search"].title,
    description: pageMeta["/search"].description
  }
};

export default function SearchPage(): React.ReactNode {
  return (
    <>
      {/* <section className="mb-2 block md:hidden">
        <Hero />
      </section> */}
      <section
        id="main-content"
        className="bg-zinc-50 dark:bg-zinc-950 flex pb-20 w-full">
        <div className="mt-2 pt-4 rounded-lg md:rounded-t-none relative bg-white/90 dark:bg-zinc-900/90 sm:bg-transparent sm:dark:bg-transparent pb-3 sm:absolute sm:top-1/4 w-full sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-y-4 overflow-auto sm:overflow-visible border border-zinc-200 dark:border-zinc-700 sm:border-none">
          <h2 className="mt-6 mb-2 text-center font-semibold text-2xl sm:text-3xl bg-transparent">
            Search
          </h2>

          <Search focusWhenMounted />

          <ThemeToggle className="md:!hidden absolute top-2 right-2 !border-b !rounded-full" />
        </div>
      </section>
    </>
  );
}
