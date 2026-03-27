import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAppStatus } from '@/hooks/useAppStatus';
import { apps } from '@/lib/apps-config';

describe('useAppStatus', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial loading state', () => {
    vi.mocked(global.fetch).mockResolvedValue(new Response(null, { status: 200 }));
    
    const { result } = renderHook(() => useAppStatus());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.appStatuses).toEqual({});
    expect(result.current.error).toBeNull();
  });

  it('should check app statuses and update state', async () => {
    vi.mocked(global.fetch).mockResolvedValue(new Response(null, { status: 200 }));
    
    const { result } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });
    
    expect(result.current.appStatuses).toBeDefined();
    expect(Object.keys(result.current.appStatuses).length).toBe(apps.length);
  });

  it('should mark apps as online when fetch succeeds', async () => {
    vi.mocked(global.fetch).mockResolvedValue(new Response(null, { status: 200 }));
    
    const { result } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });
    
    apps.forEach((app) => {
      expect(result.current.appStatuses[app.name]).toBe(true);
    });
  });

  it('should mark apps as offline when fetch fails', async () => {
    vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });
    
    apps.forEach((app) => {
      expect(result.current.appStatuses[app.name]).toBe(false);
    });
  });

  it('should provide refresh function', async () => {
    vi.mocked(global.fetch).mockResolvedValue(new Response(null, { status: 200 }));
    
    const { result } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });
    
    expect(typeof result.current.refresh).toBe('function');
  });

  it('should handle mixed online/offline statuses', async () => {
    let callCount = 0;
    vi.mocked(global.fetch).mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve(new Response(null, { status: 200 }));
      }
      return Promise.reject(new Error('Network error'));
    });
    
    const { result } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });
    
    const statuses = Object.values(result.current.appStatuses);
    expect(statuses.some((status) => status === true)).toBe(true);
  });

  it('should handle error in Promise.all', async () => {
    // Mock fetch to reject, which gets caught by inner catch and returns false
    vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });
    
    // Apps should be marked as offline
    expect(result.current.appStatuses['GitHub Portfolio']).toBe(false);
  });

  it('should handle Promise.all rejection', async () => {
    // Mock Promise.all to throw an error (edge case for outer catch)
    const originalPromiseAll = Promise.all;
    Promise.all = vi.fn(() => Promise.reject(new Error('Promise.all failed')));

    const { result } = renderHook(() => useAppStatus());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });

    // Should have error message from outer catch
    expect(result.current.error).toBe('Promise.all failed');

    // Restore Promise.all
    Promise.all = originalPromiseAll;
  });

  it('should handle non-Error rejection in outer catch', async () => {
    // Mock Promise.all to throw a non-Error (tests the fallback message branch)
    const originalPromiseAll = Promise.all;
    Promise.all = vi.fn(() => Promise.reject('String error'));

    const { result } = renderHook(() => useAppStatus());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 5000 });

    // Should use fallback message when error is not an Error instance
    expect(result.current.error).toBe('Failed to check app statuses');

    // Restore Promise.all
    Promise.all = originalPromiseAll;
  });

  it('should cleanup interval on unmount', async () => {
    vi.mocked(global.fetch).mockResolvedValue(new Response(null, { status: 200 }));
    
    const { unmount } = renderHook(() => useAppStatus());
    
    await waitFor(() => {
      expect(vi.mocked(global.fetch)).toHaveBeenCalled();
    }, { timeout: 5000 });
    
    // Unmount should cleanup the interval
    unmount();
  });
});
