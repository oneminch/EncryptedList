import { useTransition } from "react";
import { parseAsString, useQueryState } from "nuqs";

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
  const isSorted = sort !== "";

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSort(isSorted ? "" : "asc");
  };

  return {
    isSorted,
    isLoading,
    handleSort
  };
};

export default useSort;
