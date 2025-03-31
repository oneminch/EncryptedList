import { Icon } from "@iconify/react";
import ModalIcon from "../modal/modal-icon";

const Disclaimer: React.FC = () => {
  return (
    <section className="px-4 min-w-xs">
      <ModalIcon icon="ph:info-duotone" />

      <ul className="[&>li]:list-disc marker:text-yellow-500 dark:marker:text-yellow-400">
        <li>
          EncryptedList provides a list of third-party apps claiming a form of{" "}
          <a
            href="https://tresorit.com/blog/zero-knowledge-encryption?ref=encryptedlist"
            className="underline decoration-yellow-400 focus-visible:global-focus"
            target="_blank"
            rel="noopener noreferrer">
            zero-knowledge encryption
          </a>
          <Icon
            icon="ph:arrow-up-right"
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
        <li>
          Additionally, the list may contain promotional items unrelated to the
          site content.
        </li>
      </ul>
    </section>
  );
};

export default Disclaimer;
