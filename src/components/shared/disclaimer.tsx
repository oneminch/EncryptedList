import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Disclaimer(): React.ReactNode {
  return (
    <section className="w-full relative mx-auto mb-2 py-4 px-8 text-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 overflow-hidden">
      <div className="absolute top-0 left-0 w-10 h-10 bg-yellow-400 rounded-br-full">
        <Icon
          icon="heroicons:exclamation-circle-20-solid"
          className="absolute top-2 left-2 text-lg text-zinc-800"
        />
      </div>
      <div className="absolute top-0 right-0 w-12 h-12">
        <Icon
          icon="heroicons:close"
          className="absolute top-2.5 left-2.5 text-lg text-zinc-800"
        />
      </div>
      <div className="w-full mx-auto space-y-2">
        <p>
          Remember to do your research before trusting a service.
          {/* <Link
            href="/disclaimer"
            className="text-zinc-600 dark:text-zinc-400 underline decoration-dashed decoration-yellow-400">
            <strong>Disclaimer</strong>
          </Link>
          <br /> */}
          {/* Use of these apps is at your own risk. */}
        </p>
      </div>
    </section>
  );
}
