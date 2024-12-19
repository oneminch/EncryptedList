import type { Metadata } from "next";
import pageMeta from "@/lib/metadata";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";

export const metadata: Metadata = {
  title: pageMeta["/disclaimer"].title,
  description: pageMeta["/disclaimer"].description,
  openGraph: {
    title: pageMeta["/disclaimer"].title,
    description: pageMeta["/disclaimer"].description
  },
  twitter: {
    title: pageMeta["/disclaimer"].title,
    description: pageMeta["/disclaimer"].description
  }
};

export default function DisclaimerPage(): React.ReactNode {
  return (
    <>
      <section className="mb-2 hidden md:block">
        <Header />
        <Hero withSearchBar />
      </section>
      <section className="mb-2 block md:hidden">
        <Hero />
      </section>
      <section id="main-content">
        <h2 className="mt-6 mb-2 text-center font-semibold text-2xl sm:text-3xl bg-transparent">
          Search
        </h2>
        <ul>
          <li>
            do your research, and app information may change without notice
          </li>
        </ul>
        <p>
          EncryptedList is a collection of services that security through some
          form of{" "}
          <a
            href="https://tresorit.com/blog/zero-knowledge-encryption?ref=encryptedlist"
            target="_blank"
            rel="noopener">
            zero-knowledge encryption [app-external-icon]
          </a>
          🔐. This can include services that have opt-in encryption, or
          encryption on a subset of their features.
        </p>

        <h2 id="disclosure">Disclosure</h2>

        <ul>
          <li>
            Concise - This website provides information about third-party apps
            claiming end-to-end encryption for informational purposes only. We
            do not endorse or guarantee the accuracy, reliability, or security
            of any app listed. Use of these apps is at your own risk, and we are
            not liable for any damages or losses resulting from their use. App
            information may change without notice. Feel free to adjust the
            wording to better fit your website’s tone!
          </li>
          <li>
            This website is for informational purposes only. We are not
            responsible for any actions taken based on the information provided1
            ." No Warranty: "We make no warranties about the completeness,
            reliability, or accuracy of the app information presented7 ." Use at
            Own Risk: "Use of apps listed on this site is at your own risk. We
            are not liable for any damages or losses resulting from app usage7
            ." Updates: "App information may change without notice. We strive to
            provide up-to-date information but cannot guarantee its currentness
          </li>
          <li>
            This website provides information about third-party apps. We do not
            control, endorse, or guarantee the accuracy of content related to
            these apps. Use of linked apps is at your own risk1 7 ." Not
            Professional Advice: "Information provided about apps is for
            informational purposes only and should not be considered
            professional advice1 ." Encryption Disclaimer: "While apps listed
            claim to offer end-to-end encryption, we cannot verify or guarantee
            the security or privacy of your data when using these apps5 8 ."
          </li>
          <li>
            This collection is based on claims made by their respective owners
            or companies.
          </li>
          <li>
            Some of the services come with the ability to encrypt which isn't on
            by default. They either require
            <mark class="highlight">enabling encryption</mark> or have it as a
            feature on some <mark class="highlight">specific part</mark> of the
            software. These services are tagged in red as "opt-in".
          </li>
          <li>
            Products tagged as "open-source" are more reliable. However, not all
            products tagged as "open-source" are fully open source.
          </li>
          <li>
            Some services may be discontinued without notice and their link or
            URL may point to a new service that's not meant to be there.
          </li>
          <li>
            Please
            <router-link to="/report">
              report here <app-link-icon></app-link-icon>
            </router-link>
            if you notice any suspicious services.
          </li>
          <li>All product logos belong to their respective owners.</li>
          <li>
            And lastly, <mark class="highlight">do your research</mark> before
            trusting a service 🤓.
          </li>
        </ul>
      </section>
    </>
  );
}
