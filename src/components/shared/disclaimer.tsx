import { Icon } from "@iconify/react";

export default function Disclaimer(): React.ReactNode {
  return (
    <section className="px-4">
      <div className="absolute top-0 left-0 w-8 h-8 bg-yellow-400 rounded-br-full">
        <Icon
          icon="heroicons:exclamation-circle-20-solid"
          className="absolute top-1 left-1 text-lg text-zinc-800"
        />
      </div>

      <ul className="[&>li]:list-disc marker:text-yellow-500 dark:marker:text-yellow-400">
        <li>
          EncryptedList provides a list of third-party apps claiming a form of{" "}
          <a
            href="https://tresorit.com/blog/zero-knowledge-encryption?ref=encryptedlist"
            className="underline decoration-dashed decoration-yellow-400 focus-visible:global-focus"
            target="_blank"
            rel="noopener">
            zero-knowledge encryption
          </a>{" "}
          <Icon
            icon="heroicons:arrow-top-right-on-square-20-solid"
            className="inline-block text-zinc-900 dark:text-yellow-400"
          />{" "}
          as a feature. This can include services that have opt-in encryption,
          or encryption on a subset of their features.
        </li>
        <li>
          Data provided is for informational purposes only. Use of any of the
          services listed is at your own risk, and please do your research
          before trusting a service with your data.
        </li>
        <li>
          App information may change without notice. I strive to provide
          up-to-date information but cannot guarantee its currentness.
        </li>
      </ul>
    </section>
  );
}
