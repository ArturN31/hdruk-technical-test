import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilterState } from "@/hooks/useFilterState";

describe("useFilterState", () => {
  it("returns default filter state", () => {
    const { result } = renderHook(() => useFilterState());
    expect(result.current.filterType).toBe("all");
    expect(result.current.sortOption).toBe("stars_desc");
    expect(result.current.languageFilter).toBe("all");
  });

  it("updates filter type", () => {
    const { result } = renderHook(() => useFilterState());
    act(() => result.current.setFilterType("popular"));
    expect(result.current.filterType).toBe("popular");
  });

  it("updates sort option", () => {
    const { result } = renderHook(() => useFilterState());
    act(() => result.current.setSortOption("name_asc"));
    expect(result.current.sortOption).toBe("name_asc");
  });

  it("updates language filter", () => {
    const { result } = renderHook(() => useFilterState());
    act(() => result.current.setLanguageFilter("TypeScript"));
    expect(result.current.languageFilter).toBe("TypeScript");
  });

  it("resets all filters", () => {
    const { result } = renderHook(() => useFilterState());
    act(() => {
      result.current.setFilterType("popular");
      result.current.setSortOption("name_asc");
      result.current.setLanguageFilter("TypeScript");
      result.current.resetFilters();
    });
    expect(result.current.filterType).toBe("all");
    expect(result.current.sortOption).toBe("stars_desc");
    expect(result.current.languageFilter).toBe("all");
  });
});
