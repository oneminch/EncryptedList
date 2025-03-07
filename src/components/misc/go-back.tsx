"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function GoBackButton(): React.ReactNode {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className="action-item px-4 py-1 gap-x-2"
      onClick={handleGoBack}>
      <Icon icon="heroicons:arrow-left-20-solid" />
      Go Back
    </button>
  );
}
