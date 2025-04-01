"use client";

import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import { CSSTransition } from "react-transition-group";
import SearchSuggestions from "@/components/search/search-suggestions";
import metadata from "@/lib/metadata";
import useSearchQuery from "@/hooks/useSearchQuery";
import Filter from "./search-filter";
import useTag from "@/hooks/useTag";
import { getTags } from "@/lib/data";
import GenericError from "../misc/generic-error";

interface SearchProps {
  tagsInfo: Awaited<ReturnType<typeof getTags>>;
}

const Search: React.FC<SearchProps> = ({ tagsInfo }) => {
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

  const { totalSelectedTags } = useTag();

  const [toggleFilters, setToggleFilters] = useState(false);

  const handleToggleTags = () => {
    setToggleFilters((prev) => !prev);
  };

  return (
    <div className="w-full sm:w-4/5 lg:w-7/12 max-w-3xl mx-auto relative bg-transparent rounded-xl group">
      <form
        className="w-full bg-transparent backdrop-blur-sm flex flex-col items-center justify-center sm:flex-row gap-y-2 gap-x-1 rounded-xl"
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
        <button
          type="button"
          onClick={handleToggleTags}
          className="shrink-0 cursor-pointer w-full sm:w-32 h-9 flex items-center justify-center gap-x-4 rounded-lg sm:rounded-r-3xl sm:rounded-l border-[0.9px] border-zinc-800 dark:border-zinc-200 bg-zinc-800 dark:bg-zinc-200 py-2 px-4 text-sm text-zinc-200 dark:text-zinc-800 relative focus-visible:global-focus">
          <span className="inline-flex items-center gap-x-1.5">
            <Icon icon="ph:funnel-duotone" />
            Filters
          </span>
          <Icon icon={!toggleFilters ? "ph:caret-down" : "ph:caret-up"} />

          {totalSelectedTags() > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-yellow-500 text-zinc-900 rounded-full text-xs w-4 h-4"
              title={`${totalSelectedTags()} Tags Selected`}>
              {totalSelectedTags()}
            </span>
          )}
        </button>
      </form>

      <SearchSuggestions
        className={`absolute top-9 hidden ${
          isSearching ? "group-focus-within:block" : "peer-focus-within:hidden"
        }`}
        query={debouncedQuery.trim()}
        onNoSuggestions={() => setIsSubmittingAllowed(false)}
        onSomeSuggestions={() => setIsSubmittingAllowed(true)}
      />

      <CSSTransition
        in={toggleFilters}
        timeout={300}
        classNames="filter-fade"
        unmountOnExit>
        {tagsInfo.tags.length > 0 || tagsInfo.error !== null ? (
          <Filter tags={tagsInfo.tags} />
        ) : (
          <GenericError message="Error Fetching Tags." />
        )}
      </CSSTransition>
    </div>
  );
};

export default memo(Search);
