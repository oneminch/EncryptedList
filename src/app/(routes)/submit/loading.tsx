import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import PageDivider from "@/components/misc/page-divider";
import SubmissionFormSkeleton from "@/components/misc/skeletons/submission-form-skeleton";

const LoadingSubmitPage: React.FC = () => {
  return (
    <>
      <section className="mb-2">
        <Header className="hidden md:flex" />
        <Hero />
      </section>

      <PageDivider />

      <section className="py-12 mx-auto w-full sm:w-5/6 lg:w-2/3 max-w-xl flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
        <SubmissionFormSkeleton />
      </section>

      <PageDivider />

      <Footer />
    </>
  );
};

export default LoadingSubmitPage;
