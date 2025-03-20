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
      className="action-item px-4 py-1 gap-x-2"
      onClick={handleGoBack}>
      <Icon icon="ph:arrow-left" />
      Go Back
    </button>
  );
};

export default GoBackButton;
