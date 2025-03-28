"use client";

import { memo } from "react";
import { Icon } from "@iconify/react";
import SearchSuggestions from "@/components/search/search-suggestions";
import metadata from "@/lib/metadata";
import useSearchQuery from "@/hooks/useSearchQuery";

const Search: React.FC = () => {
  const {
    query,
    debouncedQuery,
    inputRef,
    isSearching,
    setIsSubmittingAllowed,
    handleKeyDown,
    handleQuerySubmit,
    handleQueryChange
  } = useSearchQuery();

  return (
    <div className="w-full sm:w-4/5 lg:w-7/12 max-w-3xl mx-auto relative bg-transparent rounded-xl group">
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
            className="w-full h-9 text-base placeholder:text-sm rounded-lg sm:rounded-l-3xl sm:rounded-r border-[0.9px] border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2 px-9 focus-visible:global-focus scroll-mt-4"
            id="search-query"
            value={query}
            ref={inputRef}
            onFocus={(e) =>
              e.target.scrollIntoView({ behavior: "smooth", block: "start" })
            }
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

      <SearchSuggestions
        className={`hidden group-focus-within:${
          isSearching ? "block" : "hidden"
        }`}
        query={debouncedQuery.trim()}
        onNoSuggestions={() => setIsSubmittingAllowed(false)}
        onSomeSuggestions={() => setIsSubmittingAllowed(true)}
      />
    </div>
  );
};

export default memo(Search);
