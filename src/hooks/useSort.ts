import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateSearchParams } from "@/lib/utils";

export default function useSort() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    const sortFromUrl = searchParams.get("sort");
    setIsSorted(sortFromUrl !== null && sortFromUrl.length > 0);
  }, [searchParams]);

  const handleSort = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsSorted((prevSortedState) => {
      const newSortedState = !prevSortedState;
      const sortParams = newSortedState ? "asc" : "";

      updateSearchParams({
        key: "sort",
        value: sortParams,
        searchParams,
        pathname,
        callback: replace
      });

      return newSortedState;
    });
  };

  return {
    isSorted,
    handleSort
  };
}
