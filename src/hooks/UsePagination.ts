// hooks/usePagination.ts
import { useState, useMemo } from "react";

export const usePagination = <T>(items: T[], itemsPerPage: number = 20) => {
  if (items === undefined) {
    return {
      currentPage: 1,
      totalPages: 1,
      paginatedItems: [],
      goToPage: () => {},
      nextPage: () => {},
      prevPage: () => {},
      hasNextPage: false,
      hasPrevPage: false,
      startIndex: 0,
      endIndex: 0,
      totalItems: 0,
    };
  }

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: (currentPage - 1) * itemsPerPage + 1,
    endIndex: Math.min(currentPage * itemsPerPage, items.length),
    totalItems: items.length,
  };
};
