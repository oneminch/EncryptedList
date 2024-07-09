"use client";

import { useDebounce, useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSearchSuggestions from "./ProductSearchSuggestions";
import { Icon } from "@iconify-icon/react";

export default function ProductSearch() {
  const windowSize = useWindowSize();

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  const handleQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("query", query);

    router.push(`/?${params.toString()}`);
    setQuery("");
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (windowSize.width && windowSize.width >= 640) {
      setIsSearching(false);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsSearching(e.target.value.length >= 3);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsSearching(debouncedQuery.trim().length >= 3);
  }, [debouncedQuery]);

  return (
    <div className="w-full sm:w-2/3 lg:w-1/2 relative bg-white dark:bg-zinc-900">
      <form
        className="w-full p-4 sticky top-0 border-b border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur flex items-center justify-center sm:border-none sm:p-0"
        onSubmit={handleQuerySubmit}
      >
        <label htmlFor="search-query" className="sr-only">
          Search Products
        </label>
        <div className="w-full flex items-center justify-center relative">
          <Icon
            icon="heroicons:magnifying-glass-20-solid"
            className="flex items-center justify-center w-6 h-6 absolute left-2 text-zinc-400 dark:text-zinc-600"
          />
          <input
            className="w-full h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 py-2 px-10 focus-visible:global-focus"
            id="search-query"
            value={query}
            ref={inputRef}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChange={handleQueryChange}
            type="text"
            aria-label="Search"
            placeholder="Search 100,000 Products"
          />
          <span className="hidden sm:flex items-center justify-center w-6 h-6 bg-white dark:bg-zinc-900 border-[0.5px] border-b-2 border-zinc-300 dark:border-zinc-600 text-sm rounded-md absolute right-2 text-zinc-400 dark:text-zinc-600">
            /
          </span>
        </div>
      </form>
      {isSearching && (
        <ProductSearchSuggestions query={debouncedQuery.trim()} />
      )}
    </div>
  );
}
