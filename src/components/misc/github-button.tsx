"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

interface GitHubButtonProps {
  className?: string;
}

const GitHubButton: React.FC<GitHubButtonProps> = ({ className }) => {
  const repoUrl = "https://github.com/oneminch/EncryptedList";

  return (
    <div className={`inline-block mx-auto ${className}`}>
      <Link
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm flex items-center justify-center rounded-md focus-visible:global-focus cursor-pointer px-3 py-1 gap-x-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 focus-visible:bg-zinc-200/50 dark:focus-visible:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
        aria-label="Star us on GitHub">
        <Icon icon="ph:star-duotone" /> Star on GitHub
      </Link>
    </div>
  );
};

export default GitHubButton;
