import { useTransition } from "react";
import { parseAsString, useQueryState } from "nuqs";
import usePagination from "./usePagination";

const useSort = () => {
  const [isLoading, startTransition] = useTransition();

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString
      .withOptions({
        history: "push",
        shallow: false,
        startTransition,
        scroll: true
      })
      .withDefault("")
  );
  const [_, setPage] = useQueryState("page");
  const isSorted = sort !== "";

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setPage(null);
    setSort(isSorted ? "" : "asc");
  };

  return {
    isSorted,
    isLoading,
    handleSort
  };
};

export default useSort;
