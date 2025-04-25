import { Icon } from "@iconify/react";
import Disclaimer from "../misc/disclaimer";
import Modal from "../modal/modal";

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-8 mx-auto pt-2 pb-6 px-6 text-zinc-600 dark:text-zinc-400 overflow-hidden text-sm">
      {/* <div className="flex justify-between text-left">
        <section className="flex flex-col items-start gap-2">
          <Link
            className="flex items-center gap-x-2 rounded-lg focus-visible:global-focus focus-visible:ring-yellow-500 dark:focus-visible:ring-yellow-500"
            href="/"
            aria-label="Home"
            title="Home">
            <img
              src="/logo.svg"
              alt="EncryptedList's Logo"
              width={24}
              height={24}
              className="w-6 h-6 dark:rounded-full dark:border dark:border-zinc-800"
            />
            <h3 className="font-semibold text-base text-zinc-700 dark:text-zinc-300">
              {pageMeta["/"].minimalTitle}
            </h3>
          </Link>
          <p className="text-sm">{pageMeta["/"].description}</p>
        </section>

        <section>
          <h3 className="font-semibold text-base text-zinc-700 dark:text-zinc-300">
            Other Tools
          </h3>

          <ul className="flex flex-col items-start gap-2 mt-2">
            <li>Tool 1</li>
            <li>Tool 2</li>
            <li>Tool 3</li>
          </ul>
        </section>
      </div> */}

      <div className="text-sm mt-6 space-y-3 text-center text-zinc-600 dark:text-zinc-600">
        <p>
          Trademarks used on this website are the property of their respective
          owners.
        </p>
        <div className="flex justify-center items-center gap-x-4">
          <Modal
            title="Disclaimer"
            triggerContent={
              <>
                Disclaimer
                <Icon icon="ph:info-duotone" />
              </>
            }
            triggerClasses="flex items-center justify-center rounded-md focus-visible:global-focus cursor-pointer px-3 py-1 gap-x-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus-visible:bg-zinc-200/50 dark:focus-visible:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300">
            <Disclaimer />
          </Modal>
          <p className="w-0 h-3 border-x-[0.5px] border-zinc-300 dark:border-zinc-700"></p>
          <p className="space-x-1">
            <span>&copy; {new Date().getFullYear()}</span>
            <a
              className="external-link rounded-lg py-0.5 px-1 text-zinc-700 dark:text-zinc-300 focus-visible:global-focus group"
              href="https://minch.dev?ref=encryptedlist.xyz"
              target="_blank"
              rel="noopener">
              Dawit
              <Icon
                icon="ph:arrow-up-right"
                className="text-yellow-500 inline-block ml-1 transition-all duration-75 scale-90 opacity-0 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:visible"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
