"use client";

import { useMemo } from "react";
import { useQuery, type RefetchOptions, type QueryObserverResult } from "@tanstack/react-query";

import type { GitHubApiErrorCode, GitHubRepository, ReposErrorResponse, ReposSuccessResponse } from "@/types/github";
import { filterRepositories } from "@/lib/filters";
import { calculateTotalStars, getUniqueLanguages } from "@/lib/stats";
import { getErrorMessage } from "@/lib/errors";
import { STALE_TIME_MS, QUERY_RETRY_COUNT } from "@/lib/constants";
import { useFilterState } from "@/hooks/useFilterState";
import { usePagination } from "@/hooks/usePagination";
import { useSearchQuery } from "@/hooks/useSearchQuery";

export interface UseGitHubResult {
  searchQuery: string;
  debouncedSearchQuery: string;
  setSearchQuery: (value: string) => void;
  filterType: string;
  sortOption: string;
  languageFilter: string;
  setFilterType: (value: string) => void;
  setSortOption: (value: string) => void;
  setLanguageFilter: (value: string) => void;
  repositories: GitHubRepository[];
  displayedRepositories: GitHubRepository[];
  filteredCount: number;
  displayedCount: number;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  errorCode: GitHubApiErrorCode | null;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<GitHubRepository[], Error & { code?: GitHubApiErrorCode }>>;
  totalStars: number;
  uniqueLanguages: string[];
}

async function fetchRepositories(username: string): Promise<GitHubRepository[]> {
  const response = await fetch(`/api/github/repos?user=${encodeURIComponent(username)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as ReposErrorResponse | null;
    const error = new Error(errorPayload?.error ?? "Unable to fetch repositories.") as Error & {
      code?: GitHubApiErrorCode;
    };
    error.code = errorPayload?.code ?? "UPSTREAM_ERROR";
    throw error;
  }

  const data = (await response.json()) as ReposSuccessResponse;
  return data.repositories;
}

export { fetchRepositories };

export function useGitHub(username: string = "vercel"): UseGitHubResult {
  const {
    filterType,
    sortOption,
    languageFilter,
    setFilterType,
    setSortOption,
    setLanguageFilter,
  } = useFilterState();

  const {
    query: searchQuery,
    debouncedQuery: debouncedSearchQuery,
    setQuery: setSearchQuery,
  } = useSearchQuery();

  const {
    data: repositories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<GitHubRepository[], Error & { code?: GitHubApiErrorCode }>({
    queryKey: ["github-repositories", username],
    queryFn: () => fetchRepositories(username),
    staleTime: STALE_TIME_MS,
    retry: QUERY_RETRY_COUNT,
  });

  const totalStars = useMemo(() => calculateTotalStars(repositories), [repositories]);
  const uniqueLanguages = useMemo(() => getUniqueLanguages(repositories), [repositories]);

  const filteredRepositories = useMemo(() => {
    return filterRepositories(
      repositories,
      filterType,
      languageFilter,
      debouncedSearchQuery,
      sortOption
    );
  }, [repositories, filterType, languageFilter, debouncedSearchQuery, sortOption]);

  const {
    displayCount,
    hasMore,
    loadMore,
    reset: resetPagination,
  } = usePagination(filteredRepositories.length);

  const handleFilterChange = () => {
    resetPagination();
  };

  const handleSetFilterType = (value: string) => {
    setFilterType(value);
    handleFilterChange();
  };

  const handleSetSortOption = (value: string) => {
    setSortOption(value);
    handleFilterChange();
  };

  const handleSetLanguageFilter = (value: string) => {
    setLanguageFilter(value);
    handleFilterChange();
  };

  const errorCode = isError && error && "code" in error ? (error.code as GitHubApiErrorCode) ?? "UPSTREAM_ERROR" : null;
  const errorMessage = getErrorMessage(errorCode);

  return {
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
    filterType,
    sortOption,
    languageFilter,
    setFilterType: handleSetFilterType,
    setSortOption: handleSetSortOption,
    setLanguageFilter: handleSetLanguageFilter,
    repositories,
    displayedRepositories: filteredRepositories.slice(0, displayCount),
    filteredCount: filteredRepositories.length,
    displayedCount: Math.min(displayCount, filteredRepositories.length),
    hasMore,
    loadMore,
    isLoading,
    isError,
    errorMessage,
    errorCode,
    refetch,
    totalStars,
    uniqueLanguages,
  };
}
