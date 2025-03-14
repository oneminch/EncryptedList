import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import PageDivider from "@/components/misc/divider";
import SubmissionFormSkeleton from "@/components/misc/skeletons/submission-form-skeleton";

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

      <section className="py-12 mx-auto w-full sm:w-5/6 lg:w-2/3 max-w-xl flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
        <SubmissionFormSkeleton />
      </section>
    </>
  );
}
