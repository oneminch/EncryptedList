import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/layout/footer";
import TabBar from "@/components/layout/tab-bar";
import pageMeta from "@/lib/metadata";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
// import Script from "next/script";

const defaultDescription = pageMeta["/"].description;

export const metadata: Metadata = {
  title: {
    template: "%s · EncryptedList",
    default: defaultDescription
  },
  description: defaultDescription,
  authors: [{ name: "Dawit (@oneminch)", url: "https://minch.dev" }],
  openGraph: {
    title: {
      template: "%s · EncryptedList",
      default: defaultDescription
    },
    description: defaultDescription,
    url: "https://encryptedlist.xyz",
    siteName: "EncryptedList",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    title: {
      template: "%s · EncryptedList",
      default: defaultDescription
    },
    description: defaultDescription,
    card: "summary_large_image",
    site: "@oneminch",
    creator: "@oneminch"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/*  Skip Navigation Link */}
        <a
          href="#main-content"
          className="flex items-center justify-center bg-yellow-400 h-9 absolute top-0 left-1/2 -translate-x-1/2 py-2 px-4 rounded-md mx-auto z-50 transform duration-300 -translate-y-[125%] opacity-0 focus-visible:translate-y-2 focus-visible:opacity-100 text-zinc-900 focus-visible:global-focus">
          Skip to Content
        </a>

        <ThemeProvider attribute="class" enableSystem>
          <main className="min-w-72">
            <article className="pb-24 md:pb-4">
              {children}
              <TabBar />
            </article>
          </main>

          {/* <Footer /> */}
        </ThemeProvider>

        {/* <Script
          src="https://measure.oneminch.dev/minch-measure"
          async
          data-website-id="1e0e9daa-a25b-4943-af4e-68c91b2d3c72"
        /> */}
      </body>
    </html>
  );
}
