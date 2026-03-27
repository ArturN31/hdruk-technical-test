import { useCallback, useState } from "react";

const DEFAULT_FILTER_STATE = {
  filterType: "all",
  sortOption: "stars_desc",
  languageFilter: "all",
};

export interface FilterState {
  filterType: string;
  sortOption: string;
  languageFilter: string;
  setFilterType: (value: string) => void;
  setSortOption: (value: string) => void;
  setLanguageFilter: (value: string) => void;
  resetFilters: () => void;
}

export function useFilterState(onFilterChange?: () => void): FilterState {
  const [filterType, setFilterTypeState] = useState(DEFAULT_FILTER_STATE.filterType);
  const [sortOption, setSortOptionState] = useState(DEFAULT_FILTER_STATE.sortOption);
  const [languageFilter, setLanguageFilterState] = useState(DEFAULT_FILTER_STATE.languageFilter);

  const setFilterType = useCallback((value: string) => {
    setFilterTypeState(value);
    onFilterChange?.();
  }, [onFilterChange]);

  const setSortOption = useCallback((value: string) => {
    setSortOptionState(value);
    onFilterChange?.();
  }, [onFilterChange]);

  const setLanguageFilter = useCallback((value: string) => {
    setLanguageFilterState(value);
    onFilterChange?.();
  }, [onFilterChange]);

  const resetFilters = useCallback(() => {
    setFilterTypeState(DEFAULT_FILTER_STATE.filterType);
    setSortOptionState(DEFAULT_FILTER_STATE.sortOption);
    setLanguageFilterState(DEFAULT_FILTER_STATE.languageFilter);
  }, []);

  return {
    filterType,
    sortOption,
    languageFilter,
    setFilterType,
    setSortOption,
    setLanguageFilter,
    resetFilters,
  };
}
