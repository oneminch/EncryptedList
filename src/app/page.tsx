import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import AppList from "@/components/apps/app-list";
import Pagination from "@/components/apps/app-pagination";
import GenericError from "@/components/misc/generic-error";
import pageMeta from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { sleep, stringifySearchParams as stringify } from "@/lib/utils";
import { getApps, getTags } from "@/lib/data";
import PageDivider from "@/components/misc/divider";

export const metadata: Metadata = {
  title: { absolute: pageMeta["/"].title },
  description: pageMeta["/"].description,
  openGraph: {
    title: pageMeta["/"].minimalTitle,
    description: pageMeta["/"].description
  },
  twitter: {
    title: pageMeta["/"].minimalTitle,
    description: pageMeta["/"].description
  }
};

export default async function HomePage({
  searchParams
}: {
  searchParams: QueryParams;
}): Promise<React.ReactNode> {
  await sleep(4000);
  const [{ apps, totalPages, error: appsError }, { tags, error: tagError }] =
    await Promise.all([getApps(stringify(searchParams)), getTags()]);

  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        {/* <Hero /> */}
        <Hero withSearchBar />
      </section>

      <PageDivider />

      <section>
        {/* {tags.length > 0 || tagError !== null ? (
          <Filter className="shrink-0" tags={tags} />
        ) : (
          <GenericError message="Error Fetching Tags." />
        )} */}

        <section className="w-full min-w-60 px-2 md:px-6 flex-1 ">
          {apps !== null || appsError === undefined ? (
            <>
              <AppList apps={apps} />
              {totalPages !== null && (
                <Pagination totalPages={totalPages} disabled={false} />
              )}
            </>
          ) : (
            <GenericError message={appsError} />
          )}
        </section>
      </section>

      <Footer />
    </>
  );
}
