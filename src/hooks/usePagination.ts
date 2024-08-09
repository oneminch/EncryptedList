/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateSearchParams } from "@/lib/utils";

export default function usePagination(totalPages: number) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const INITIAL_PAGE = 1;
  const [pageStatus, setPageStatus] = useState({
    current: INITIAL_PAGE,
    isFirst: true,
    isLast: false
  });

  useEffect(() => {
    let pageFromUrl = parseInt(
      searchParams.get("page") || INITIAL_PAGE.toString()
    );

    if (pageFromUrl > totalPages || pageFromUrl < INITIAL_PAGE) {
      pageFromUrl = INITIAL_PAGE;

      updateSearchParams({
        key: "page",
        value: "",
        searchParams,
        pathname,
        callback: replace,
        resetPagination: false
      });
    }

    setPageStatus({
      current: pageFromUrl,
      isFirst: pageFromUrl === INITIAL_PAGE,
      isLast: pageFromUrl === totalPages
    });
  }, [searchParams, totalPages]);

  const paginate = {
    to: (page: number) => {
      setPageStatus({
        current: page,
        isFirst: page === INITIAL_PAGE,
        isLast: page === totalPages
      });
      updateSearchParams({
        key: "page",
        value: page.toString(),
        searchParams,
        pathname,
        callback: replace,
        resetPagination: false
      });
    },
    toPrevPage: () => {
      if (pageStatus.current > INITIAL_PAGE) {
        paginate.to(pageStatus.current - 1);
      }
    },
    toNextPage: () => {
      if (pageStatus.current <= totalPages) {
        paginate.to(pageStatus.current + 1);
      }
    }
  };

  return {
    currentPage: pageStatus.current,
    isOnFirstPage: pageStatus.isFirst,
    isOnLastPage: pageStatus.isLast,
    toPrevPage: paginate.toPrevPage,
    toNextPage: paginate.toNextPage
  };
}
