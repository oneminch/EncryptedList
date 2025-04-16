"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const GoBackButton: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className="h-9 flex items-center justify-center rounded-md border border-b-2 border-zinc-200 dark:border-zinc-700 focus-visible:global-focus bg-zinc-50 dark:bg-zinc-800 cursor-pointer px-4 py-1 gap-x-2"
      onClick={handleGoBack}>
      <Icon icon="ph:arrow-left" />
      Go Back
    </button>
  );
};

export default GoBackButton;
