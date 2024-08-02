import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import GoBackButton from "@/components/shared/GoBackButton";

export const metadata: Metadata = {
  title: pageMeta["/not-found"].title,
  description: pageMeta["/not-found"].description
};

export default function NotFound() {
  return (
    <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:from-85% before:to-yellow-400 z-50">
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-8 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-lg">
        <Image
          src="/logo.svg"
          alt="EncryptedList's Logo"
          className="w-20 h-20"
          width={80}
          height={80}
        />
        <h1 className="text-center font-semibold text-3xl">
          Page Doesn&apos;t Exist
        </h1>
        <ul className="flex items-center justify-center gap-x-4">
          <li>
            <GoBackButton />
          </li>
          <li>
            <Link className="action-item px-4 py-1" href="/">
              Go Home 🏠
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
