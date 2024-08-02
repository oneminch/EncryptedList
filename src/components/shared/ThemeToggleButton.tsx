"use client";

import { Icon } from "@iconify-icon/react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        type="button"
        className="action-item w-9"
        onClick={handleThemeToggle}
        aria-label="Toggle Theme"
      >
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
