import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCurrentTime } from '@/hooks/useCurrentTime';

describe('useCurrentTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return current date on initial render', () => {
    const now = new Date('2024-01-15T10:00:00Z');
    vi.setSystemTime(now);
    
    const { result } = renderHook(() => useCurrentTime());
    
    expect(result.current).toEqual(now);
  });

  it('should update time every second', () => {
    const initialTime = new Date('2024-01-15T10:00:00Z');
    vi.setSystemTime(initialTime);
    
    const { result } = renderHook(() => useCurrentTime());
    
    expect(result.current).toEqual(initialTime);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.getTime()).toBe(initialTime.getTime() + 1000);
  });

  it('should update time multiple times', () => {
    const initialTime = new Date('2024-01-15T10:00:00Z');
    vi.setSystemTime(initialTime);
    
    const { result } = renderHook(() => useCurrentTime());
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    const timeAfter1s = result.current;
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    const timeAfter2s = result.current;
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    const timeAfter3s = result.current;
    
    expect(timeAfter1s.getTime()).toBe(initialTime.getTime() + 1000);
    expect(timeAfter2s.getTime()).toBe(initialTime.getTime() + 2000);
    expect(timeAfter3s.getTime()).toBe(initialTime.getTime() + 3000);
  });

  it('should cleanup timer on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    
    const { unmount } = renderHook(() => useCurrentTime());
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('should return Date object', () => {
    const { result } = renderHook(() => useCurrentTime());
    
    expect(result.current).toBeInstanceOf(Date);
  });
});
