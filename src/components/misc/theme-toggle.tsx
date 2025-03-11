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
        className={`w-7 h-7 flex items-center justify-center rounded-full focus-visible:global-focus hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800 cursor-pointer text-base ${className}`}
        onClick={handleThemeToggle}
        aria-label="Toggle Theme">
        <Icon
          icon={theme === "dark" ? "ph:moon-duotone" : "ph:sun-duotone"}
          data-testid="theme-toggle-icon"
        />
      </button>
    </div>
  );
}
