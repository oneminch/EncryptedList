"use client";

import GenericError from "@/components/misc/generic-error";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <section className="absolute inset-0 flex flex-col items-center justify-center">
      <GenericError
        message={error.message}
        classes="bg-transparent! border-none!"
      />
      <button
        type="button"
        className="h-9 flex items-center justify-center rounded-md border border-b-2 border-zinc-200 dark:border-zinc-700 focus-visible:global-focus bg-zinc-50 dark:bg-zinc-800 cursor-pointer px-4 py-1"
        onClick={() => reset()}>
        Refresh
      </button>
    </section>
  );
};

export default ErrorPage;
