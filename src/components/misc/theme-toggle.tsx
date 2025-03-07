"use client";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

export default function ThemeToggle({
  className
}: {
  className?: string;
}): React.ReactNode {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        type="button"
        className={`action-item w-9 ${className}`}
        onClick={handleThemeToggle}
        aria-label="Toggle Theme">
        <Icon
          icon={
            theme === "dark"
              ? "heroicons:moon-20-solid"
              : "heroicons:sun-20-solid"
          }
          data-testid="theme-toggle-icon"
        />
      </button>
    </div>
  );
}
