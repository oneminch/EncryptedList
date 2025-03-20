"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useDebounce, useWindowSize } from "@uidotdev/usehooks";
import SearchSuggestions from "@/components/search/search-suggestions";
import metadata from "@/lib/metadata";

const Search: React.FC = () => {
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

  const hideSuggestions = () => {
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
    <div className="w-full sm:w-4/5 lg:w-7/12 max-w-3xl mx-auto relative bg-transparent rounded-xl">
      <form
        className="w-full sticky top-0 bg-transparent backdrop-blur-sm flex flex-col items-center justify-center sm:flex-row gap-y-2 gap-x-1 rounded-xl"
        onSubmit={handleQuerySubmit}>
        <label htmlFor="search-query" className="sr-only">
          Search Apps
        </label>
        <div className="w-full flex items-center justify-center relative rounded-lg">
          <Icon
            icon="ph:magnifying-glass"
            className="flex items-center justify-center w-6 text-lg absolute left-1.5 text-zinc-400 dark:text-zinc-600"
          />
          <input
            className="w-full h-9 text-base placeholder:text-sm rounded-lg sm:rounded-l-3xl sm:rounded-r border-[0.9px] border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-9 focus-visible:global-focus"
            id="search-query"
            value={query}
            ref={inputRef}
            onBlur={hideSuggestions}
            onFocus={showSuggestions}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder={metadata["/search"].description}
          />
          <span className="hidden sm:flex items-center justify-center w-6 h-full -mt-0.5 text-sm rounded-md absolute right-2 text-zinc-500 dark:text-zinc-500 shrink-0 leading-0">
            [ / ]
          </span>
        </div>
        <span className="shrink-0 w-full sm:w-24 h-9 flex items-center justify-center gap-x-1.5 rounded-lg sm:rounded-r-3xl sm:rounded-l border-[0.9px] border-zinc-800 dark:border-zinc-200 bg-zinc-800 dark:bg-zinc-200 py-2 px-4 text-sm text-zinc-200 dark:text-zinc-800">
          Tags
          <Icon icon="ph:tag-duotone" />
        </span>
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
};

export default memo(Search);
