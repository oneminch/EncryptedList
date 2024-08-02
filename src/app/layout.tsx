import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import TabBar from "@/components/layout/TabBar";
import { ThemeProvider } from "next-themes";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s · EncryptedList",
    default: "Browser Secure Apps"
  }
};

// useHead({
//   titleTemplate: "%s · EncryptedList"
// });

// const route = useRoute();

// const serverMeta = {
//   ogImage: "/og-image.png",
//   twitterImage: "/og-image.png",
//   ogType: "website",
//   ogLocale: "en_US",
//   twitterCard: "summary",
//   twitterCreator: "@oneminch"
// };

// useSeoMeta({
//   title: () => route.meta.title,
//   description: () => route.meta.description,
//   ogTitle: () => `${route.meta.title} · EncryptedList`,
//   twitterTitle: () => `${route.meta.title} · EncryptedList`,
//   ogDescription: () => route.meta.description,
//   twitterDescription: () => route.meta.description,
//   ogUrl: () => `https://encryptedlist.xyz${route.path}`,
//   ...serverMeta
// });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        {/*  Skip Navigation Link */}
        <a
          href="#main-content"
          className="flex items-center justify-center bg-yellow-400 h-9 absolute top-0 left-1/2 -translate-x-1/2 py-2 px-4 rounded-md mx-auto z-50 transform duration-300 -translate-y-[125%] opacity-0 focus:translate-y-2 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-opacity-50 text-zinc-900"
        >
          Skip to Content
        </a>

        <ThemeProvider attribute="class" enableSystem>
          <main id="main-content" className="min-w-72">
            <article className="pb-24">
              <div className="mb-2 hidden md:block">
                <Header />
                <Hero withSearchBar={true} />
              </div>
              <div className="mb-2 block md:hidden">
                <Hero withLogo={true} />
              </div>
              {children}
              <TabBar />
            </article>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
