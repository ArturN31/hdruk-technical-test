import { describe, expect, it } from "vitest";
import { usePagination } from "@/hooks/usePagination";
import { renderHook, act } from "@testing-library/react";

describe("usePagination", () => {
  it("returns default pagination state", () => {
    const { result } = renderHook(() => usePagination(100));
    
    expect(result.current.displayCount).toBe(12);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.currentPage).toBe(1);
  });

  it("loads more items", () => {
    const { result } = renderHook(() => usePagination(100));
    
    act(() => {
      result.current.loadMore();
    });
    
    expect(result.current.displayCount).toBe(24);
    expect(result.current.currentPage).toBe(2);
  });

  it("resets display count", () => {
    const { result } = renderHook(() => usePagination(100));
    
    act(() => {
      result.current.loadMore();
    });
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.displayCount).toBe(12);
  });

  it("sets specific page", () => {
    const { result } = renderHook(() => usePagination(100));
    
    act(() => {
      result.current.setPage(3);
    });
    
    expect(result.current.displayCount).toBe(36);
    expect(result.current.currentPage).toBe(3);
  });

  it("returns hasMore false when all items displayed", () => {
    const { result } = renderHook(() => usePagination(10));
    
    expect(result.current.hasMore).toBe(false);
  });

  it("uses custom items per page", () => {
    const { result } = renderHook(() => usePagination(100, 20));
    
    expect(result.current.displayCount).toBe(20);
    
    act(() => {
      result.current.loadMore();
    });
    
    expect(result.current.displayCount).toBe(40);
  });
});
