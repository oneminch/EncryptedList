import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import PageDivider from "@/components/misc/divider";
import AppListSkeleton from "@/components/misc/skeletons/app-list-skeleton";

export default function LoadingPage(): React.ReactNode {
  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero />
      </section>

      <PageDivider />

      <section className="flex flex-col md:flex-row items-start gap-4">
        <section className="w-full min-w-60 flex-1 ">
          <AppListSkeleton />
        </section>
      </section>
    </>
  );
}
