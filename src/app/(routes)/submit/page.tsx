import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import pageMeta from "@/lib/metadata";
import SubmissionForm from "@/components/misc/submission-form";

export const metadata: Metadata = {
  title: pageMeta["/submit"].title,
  description: pageMeta["/submit"].description,
  openGraph: {
    title: pageMeta["/submit"].title,
    description: pageMeta["/submit"].description
  },
  twitter: {
    title: pageMeta["/submit"].title,
    description: pageMeta["/submit"].description
  }
};

export default function SubmitPage(): React.ReactNode {
  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero />
      </section>
      <section
        id="main-content"
        className="py-10 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
        <SubmissionForm />
      </section>
    </>
  );
}
