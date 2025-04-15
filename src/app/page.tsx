import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import AppList from "@/components/apps/app-list";
import Pagination from "@/components/apps/app-pagination";
import GenericError from "@/components/misc/generic-error";
import pageMeta from "@/lib/metadata";
import type { QueryParams } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { getApps, getTags } from "@/lib/data";
import PageDivider from "@/components/misc/page-divider";

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

interface HomePageProps {
  searchParams: Promise<QueryParams>;
}

const HomePage = async (props: HomePageProps) => {
  const searchParams = await props.searchParams;

  const [appsInfo, tagsInfo] = await Promise.all([
    getApps(JSON.stringify(searchParams)),
    getTags()
  ]);

  return (
    <>
      <section className="mb-2">
        <Header className="hidden md:flex" />
        <Hero withSearchBar tagsInfo={tagsInfo} />
      </section>

      <PageDivider />

      <section>
        <section className="w-full min-w-60 px-2 md:px-6 flex-1 ">
          {appsInfo.apps !== null || appsInfo.error === undefined ? (
            <>
              <AppList apps={appsInfo.apps} />
              {appsInfo.totalPages !== null && (
                <Pagination totalPages={appsInfo.totalPages} disabled={false} />
              )}
            </>
          ) : (
            <GenericError classes="col-span-full!" message={appsInfo.error} />
          )}
        </section>
      </section>

      <PageDivider />

      <Footer />
    </>
  );
};

export default HomePage;
