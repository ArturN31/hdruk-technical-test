import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchQuery } from "@/hooks/useSearchQuery";

describe("useSearchQuery", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("returns default search state", () => {
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current.query).toBe("");
    expect(result.current.isEmpty).toBe(true);
  });

  it("updates query immediately", () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => result.current.setQuery("test"));
    expect(result.current.query).toBe("test");
  });

  it("debounces query", () => {
    const { result } = renderHook(() => useSearchQuery(100));
    act(() => result.current.setQuery("test"));
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.debouncedQuery).toBe("test");
  });

  it("clears query", () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => result.current.setQuery("test"));
    act(() => result.current.clearQuery());
    expect(result.current.query).toBe("");
  });

  it("uses custom debounce delay", () => {
    const { result } = renderHook(() => useSearchQuery(500));
    act(() => result.current.setQuery("test"));
    act(() => vi.advanceTimersByTime(400));
    expect(result.current.debouncedQuery).toBe("");
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.debouncedQuery).toBe("test");
  });

  it("debounces with default delay", () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => result.current.setQuery("test"));
    act(() => vi.advanceTimersByTime(300));
    expect(result.current.debouncedQuery).toBe("test");
  });
});
