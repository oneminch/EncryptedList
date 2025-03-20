import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import TabBar from "@/components/layout/tab-bar";
import pageMeta from "@/lib/metadata";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";

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
        <a
          href="#main-content"
          className="flex items-center justify-center bg-yellow-400 h-9 absolute top-0 left-1/2 -translate-x-1/2 py-2 px-4 rounded-md mx-auto z-50 transform duration-300 -translate-y-[125%] opacity-0 focus-visible:translate-y-2 focus-visible:opacity-100 text-zinc-900 focus-visible:global-focus">
          Skip to Content
        </a>

        <ThemeProvider attribute="class" enableSystem>
          <main className="max-w-5xl mx-auto px-2 min-w-72 w-full">
            <article className="pb-24 md:pb-4">
              {children}
              <TabBar />
            </article>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
