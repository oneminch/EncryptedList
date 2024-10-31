"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className="action-item px-4 py-1"
      onClick={handleGoBack}>
      ↩ Go Back
    </button>
  );
}
