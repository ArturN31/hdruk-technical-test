import { useCallback, useState } from "react";
import { ITEMS_PER_PAGE } from "@/lib/constants";

/**
 * Pagination state returned by usePagination hook.
 */
export interface PaginationState {
  displayCount: number;
  hasMore: boolean;
  currentPage: number;
  loadMore: () => void;
  reset: () => void;
  setPage: (page: number) => void;
}

/**
 * Hook for managing pagination state.
 * Handles display count, hasMore flag, and load more functionality.
 * 
 * @param totalItems - Total number of items available
 * @param itemsPerPage - Number of items to show per page (default: ITEMS_PER_PAGE)
 * @returns Pagination state and control functions
 */
export function usePagination(
  totalItems: number,
  itemsPerPage: number = ITEMS_PER_PAGE
): PaginationState {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);

  const hasMore = displayCount < totalItems;
  const currentPage = Math.ceil(displayCount / itemsPerPage);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + itemsPerPage);
  }, [itemsPerPage]);

  const reset = useCallback(() => {
    setDisplayCount(itemsPerPage);
  }, [itemsPerPage]);

  const setPage = useCallback((page: number) => {
    setDisplayCount(page * itemsPerPage);
  }, [itemsPerPage]);

  return {
    displayCount,
    hasMore,
    currentPage,
    loadMore,
    reset,
    setPage,
  };
}
