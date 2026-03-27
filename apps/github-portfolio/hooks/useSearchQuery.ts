import { useEffect, useState } from "react";
import { DEBOUNCE_DELAY_MS } from "@/lib/constants";

/**
 * Search query state returned by useSearchQuery hook.
 */
export interface SearchQueryState {
  query: string;
  debouncedQuery: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
  isEmpty: boolean;
}

/**
 * Hook for managing search query with debouncing.
 * Provides both immediate and debounced query values.
 * 
 * @param delayMs - Debounce delay in milliseconds (default: DEBOUNCE_DELAY_MS)
 * @returns Search query state and control functions
 */
export function useSearchQuery(delayMs: number = DEBOUNCE_DELAY_MS): SearchQueryState {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [query, delayMs]);

  const clearQuery = () => setQuery("");
  const isEmpty = query.trim() === "";

  return {
    query,
    debouncedQuery,
    setQuery,
    clearQuery,
    isEmpty,
  };
}
