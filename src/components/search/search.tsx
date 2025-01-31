"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useDebounce, useWindowSize } from "@uidotdev/usehooks";
import SearchSuggestions from "@/components/search/search-suggestions";

export default function Search({
  focusWhenMounted
}: {
  focusWhenMounted?: boolean;
}): React.ReactNode {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSubmittingAllowed, setIsSubmittingAllowed] = useState<boolean>(true);

  const windowSize = useWindowSize();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, []);

  useEffect(() => {
    setIsSearching(debouncedQuery.trim().length >= 3);
  }, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const hideSuggestions = (e: React.FocusEvent<HTMLInputElement>) => {
    if (windowSize.width && windowSize.width >= 640) {
      setIsSearching(false);
    }
  };

  const showSuggestions = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsSearching(e.target.value.length >= 3);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSubmittingAllowed) {
      return;
    }

    const params = new URLSearchParams();
    params.set("query", query);

    router.push(`/?${params.toString()}`, {
      scroll: true
    });
    setQuery("");
  };

  return (
    <div className="w-full sm:w-2/3 lg:w-1/2 relative bg-transparent rounded-lg">
      <form
        className="w-full p-4 sticky top-0 sm:border-b border-zinc-200 dark:border-zinc-700 bg-transparent backdrop-blur flex items-center justify-center sm:border-none sm:p-0 rounded-lg"
        onSubmit={handleQuerySubmit}>
        <label htmlFor="search-query" className="sr-only">
          Search Products
        </label>
        <div className="w-full flex items-center justify-center relative rounded-lg">
          <Icon
            icon="heroicons:magnifying-glass-20-solid"
            className="flex items-center justify-center w-6 h-6 absolute left-2 text-zinc-400 dark:text-zinc-600"
          />
          <input
            className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 py-2 px-10 focus-visible:global-focus"
            id="search-query"
            value={query}
            ref={inputRef}
            onBlur={hideSuggestions}
            onFocus={showSuggestions}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            type="text"
            autoFocus={focusWhenMounted}
            placeholder="Search Over 250 Apps"
          />
          <span className="hidden sm:flex items-center justify-center w-6 h-6 bg-white dark:bg-zinc-900 border-[0.5px] border-b-2 border-zinc-300 dark:border-zinc-600 text-sm rounded-md absolute right-2 text-zinc-400 dark:text-zinc-600">
            /
          </span>
        </div>
      </form>
      {isSearching && (
        <SearchSuggestions
          query={debouncedQuery.trim()}
          onNoSuggestions={() => setIsSubmittingAllowed(false)}
          onSomeSuggestions={() => setIsSubmittingAllowed(true)}
        />
      )}
    </div>
  );
}
