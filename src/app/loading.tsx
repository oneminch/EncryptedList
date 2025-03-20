import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import PageDivider from "@/components/misc/page-divider";
import AppListSkeleton from "@/components/misc/skeletons/app-list-skeleton";

const LoadingPage: React.FC = () => {
  return (
    <>
      <section className="mb-2">
        <Header className="hidden md:flex" />
        <Hero withSearchBar />
      </section>

      <PageDivider />

      <section className="flex flex-col md:flex-row items-start gap-4">
        <section className="w-full min-w-60 flex-1 ">
          <AppListSkeleton />
        </section>
      </section>
    </>
  );
};

export default LoadingPage;
