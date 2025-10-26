"use client";

import { Icon } from "@iconify/react";

interface GitHubButtonProps {
  className?: string;
}

const GitHubButton: React.FC<GitHubButtonProps> = ({ className }) => {
  const repoUrl = "https://github.com/oneminch/EncryptedList";

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-7 h-7 flex items-center justify-center rounded-full focus-visible:global-focus hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:bg-zinc-200/50 dark:focus-visible:bg-zinc-800/50 cursor-pointer text-base ${className}`}
      aria-label="Star us on GitHub">
      <Icon icon="ph:star-duotone" />
    </a>
  );
};

export default GitHubButton;
