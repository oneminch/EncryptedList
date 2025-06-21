"use client";

import { useEffect, useState, useTransition } from "react";
import { parseAsString, useQueryState } from "nuqs";

const usePagination = (totalPages: number) => {
  const INITIAL_PAGE = 1;

  const [isLoading, startTransition] = useTransition();

  const [page, setPage] = useQueryState(
    "page",
    parseAsString
      .withOptions({
        history: "push",
        shallow: false,
        startTransition,
        scroll: true
      })
      .withDefault(INITIAL_PAGE.toString())
  );

  const [pageStatus, setPageStatus] = useState({
    current: INITIAL_PAGE,
    isFirst: true,
    isLast: false
  });

  useEffect(() => {
    let pageNum = parseInt(page);

    if (pageNum > totalPages || pageNum < INITIAL_PAGE) {
      pageNum = INITIAL_PAGE;
      setPage("");
    }

    setPageStatus({
      current: pageNum,
      isFirst: pageNum === INITIAL_PAGE,
      isLast: pageNum === totalPages
    });
  }, [page, totalPages, setPage]);

  const paginate = {
    to: (newPage: number) => {
      setPage(newPage.toString());
    },
    toPrevPage: () => {
      if (pageStatus.current > INITIAL_PAGE) {
        paginate.to(pageStatus.current - 1);
      }
    },
    toNextPage: () => {
      if (pageStatus.current < totalPages) {
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
