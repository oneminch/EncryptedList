import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateSearchParams } from "@/lib/utils";

export default function useSort() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sortFromUrl = searchParams.get("sort");
    setIsSorted(sortFromUrl !== null && sortFromUrl.length > 0);

    setIsLoading(false);
  }, [searchParams]);

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newSortedState = !isSorted;

    setTimeout(() => {
      updateSearchParams({
        key: "sort",
        value: newSortedState ? "asc" : "",
        searchParams,
        pathname,
        callback: replace
      });
    }, 0);
  };

  return {
    isSorted,
    isLoading,
    handleSort
  };
}
