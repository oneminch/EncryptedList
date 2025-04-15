import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import pageMeta from "@/lib/metadata";
import PageDivider from "@/components/misc/page-divider";
import SubmissionFormSkeleton from "@/components/misc/skeletons/submission-form-skeleton";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/footer";
import PromoBanner from "@/components/misc/promotional/promo-banner";
import { type BannerPromotion } from "@/lib/types";

const SubmissionForm = dynamic(
  () => import("@/components/misc/submission-form"),
  {
    loading: () => <SubmissionFormSkeleton />
    // ssr: false
  }
);

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

const SubmitPage: React.FC = () => {
  const promoInfo = {
    iconUrl: "https://icons.encryptedlist.xyz/logo.svg",
    title: "EncryptedList",
    shortDescription: "Discover Secure-by-Design Software.",
    cta: {
      label: "Learn More",
      url: "https://encryptedlist.xyz/"
    },
    tailwindBackgroundColorVariable: "--color-yellow-500",
    tailwindForegroundColorVariable: "--color-zinc-800"
  } satisfies BannerPromotion;

  return (
    <>
      <section className="mb-2">
        <PromoBanner {...promoInfo} />
        <Header className="hidden md:flex" />
        <Hero />
      </section>

      <PageDivider />

      <section className="py-10 mx-auto w-full sm:w-5/6 lg:w-2/3 max-w-xl flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg">
        <SubmissionForm />
      </section>

      <PageDivider />

      <Footer />
    </>
  );
};

export default SubmitPage;
