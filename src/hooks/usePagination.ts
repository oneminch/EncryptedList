"use client";

import { useEffect, useState, useTransition } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

const usePagination = (totalPages: number | null) => {
  const INITIAL_PAGE = 1;

  const [isLoading, startTransition] = useTransition();

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withOptions({
        history: "push",
        shallow: false,
        startTransition,
        scroll: true
      })
      .withDefault(INITIAL_PAGE)
  );

  const [pageStatus, setPageStatus] = useState({
    current: INITIAL_PAGE,
    isFirst: true,
    isLast: false
  });

  useEffect(() => {
    let pageNum = page;

    if (pageNum > totalPages! || pageNum < INITIAL_PAGE) {
      setPage(null);
    }

    setPageStatus({
      current: pageNum,
      isFirst: pageNum === INITIAL_PAGE,
      isLast: pageNum === totalPages
    });
  }, [page, totalPages, setPage]);

  const paginate = {
    to: (newPage: number) => {
      setPage(newPage);
    },
    toPrevPage: () => {
      if (pageStatus.current > INITIAL_PAGE) {
        paginate.to(pageStatus.current - 1);
      }
    },
    toNextPage: () => {
      if (pageStatus.current < totalPages!) {
        paginate.to(pageStatus.current + 1);
      }
    }
  };

  return {
    isLoading,
    currentPage: pageStatus.current,
    isOnFirstPage: pageStatus.isFirst,
    isOnLastPage: pageStatus.isLast,
    toPrevPage: paginate.toPrevPage,
    toNextPage: paginate.toNextPage
  };
};

export default usePagination;
