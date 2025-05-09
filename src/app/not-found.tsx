import type { Metadata } from "next";
import Link from "next/link";
import GoBackButton from "@/components/misc/go-back";
import pageMeta from "@/lib/metadata";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: pageMeta["/not-found"].title,
  description: pageMeta["/not-found"].description
};

const NotFound: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:from-85% before:to-yellow-400 z-50">
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-8 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg">
        <img
          src="/logo.svg"
          alt="EncryptedList's Logo"
          className="w-20 h-20"
          width={80}
          height={80}
        />
        <h1 className="text-center font-semibold text-3xl">
          This Page Doesn&apos;t Exist
        </h1>
        <ul className="flex items-center justify-center gap-x-4">
          <li>
            <GoBackButton />
          </li>
          <li>
            <Link
              className="h-9 flex items-center justify-center rounded-md border border-b-2 border-zinc-200 dark:border-zinc-700 focus-visible:global-focus bg-zinc-50 dark:bg-zinc-800 cursor-pointer px-4 py-1 gap-x-2"
              href="/">
              <Icon icon="ph:house-duotone" />
              Go Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
