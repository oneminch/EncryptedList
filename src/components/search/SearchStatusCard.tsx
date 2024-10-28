"use client";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchStatusCard: React.FC = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    searchQuery.length > 0 && (
      <div className="pt-1 py-3 my-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center text-zinc-500 dark:text-zinc-400">
        <Icon
          icon="heroicons:magnifying-glass-20-solid"
          className="flex items-center justify-center mr-2 text-xl"
        />
        <h2 className="text-left font-medium">
          Showing Search Results for &quot;
          <span className="underline decoration-yellow-400 text-zinc-800 dark:text-zinc-100">
            {searchQuery}
          </span>
          &quot;
        </h2>
      </div>
    )
  );
};

export default SearchStatusCard;
