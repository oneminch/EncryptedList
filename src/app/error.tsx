"use client";

import GenericError from "@/components/shared/generic-error";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactNode {
  return (
    <section className="absolute inset-0 flex flex-col items-center justify-center">
      <GenericError
        message={error.message}
        classes="!bg-transparent !border-none"
      />
      <button
        type="button"
        className="action-item px-4 py-1"
        onClick={() => reset()}>
        Refresh
      </button>
    </section>
  );
}
