import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import TabBar from "@/components/layout/tab-bar";
import pageMeta from "@/lib/metadata";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import VercelAnalytics from "@/lib/analytics";
import SkipNav from "@/components/misc/skip-nav";

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

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SkipNav />

        <ThemeProvider attribute="class" enableSystem>
          <NuqsAdapter>
            <main className="max-w-5xl mx-auto px-2 min-w-72 w-full">
              <article className="pb-24 md:pb-4">
                {children}
                <TabBar />
              </article>
            </main>
          </NuqsAdapter>
        </ThemeProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
};

export default RootLayout;
