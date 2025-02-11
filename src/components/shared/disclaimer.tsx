import { Icon } from "@iconify/react";
import ModalIcon from "./modal-icon";

export default function Disclaimer(): React.ReactNode {
  return (
    <section className="px-4 min-w-sm">
      <ModalIcon icon="heroicons:exclamation-circle-20-solid" />

      <ul className="[&>li]:list-disc marker:text-yellow-500 dark:marker:text-yellow-400">
        <li>
          EncryptedList provides a list of third-party apps claiming a form of{" "}
          <a
            href="https://tresorit.com/blog/zero-knowledge-encryption?ref=encryptedlist"
            className="underline decoration-yellow-400 focus-visible:global-focus"
            target="_blank"
            rel="noopener">
            zero-knowledge encryption
          </a>
          <Icon
            icon="heroicons:arrow-top-right-on-square-20-solid"
            className="inline-block mx-1 text-zinc-700 dark:text-yellow-400"
          />
          as a feature. This can include services that have opt-in encryption,
          or encryption on a subset of their features.
        </li>
        <li>
          Please do your research before trusting a service with your data. Data
          provided is for informational purposes only.
        </li>
        <li>
          App information may change without notice. I strive to provide
          up-to-date information but cannot guarantee its currentness.
        </li>
      </ul>
    </section>
  );
}
