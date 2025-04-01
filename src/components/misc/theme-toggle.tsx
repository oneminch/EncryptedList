"use client";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        type="button"
        className={`w-7 h-7 flex items-center justify-center rounded-full focus-visible:global-focus hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:bg-zinc-200/50 dark:focus-visible:bg-zinc-800/50 cursor-pointer text-base ${className}`}
        onClick={handleThemeToggle}
        aria-label="Toggle Theme">
        <Icon icon={theme === "dark" ? "ph:moon-duotone" : "ph:sun-duotone"} />
      </button>
    </div>
  );
};

export default ThemeToggle;
