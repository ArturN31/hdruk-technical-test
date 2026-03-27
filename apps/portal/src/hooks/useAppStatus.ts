import { useState, useEffect, useCallback } from 'react';
import { apps } from '@/lib/apps-config';
import { STATUS_CHECK_TIMEOUT_MS, STATUS_CHECK_INTERVAL_MS } from '@/lib/constants';
import type { AppStatuses } from '@/types';

/**
 * Hook to check and monitor the status of applications.
 * Performs initial check and then periodically re-checks.
 * 
 * @returns Object containing app statuses and a manual refresh function
 */
export function useAppStatus() {
  const [appStatuses, setAppStatuses] = useState<AppStatuses>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAll = useCallback(async () => {
    const statuses: AppStatuses = {};
    
    try {
      const results = await Promise.all(
        apps.map(async (app) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), STATUS_CHECK_TIMEOUT_MS);
            
            await fetch(app.url, {
              method: 'HEAD',
              signal: controller.signal,
              mode: 'no-cors',
            });
            
            clearTimeout(timeoutId);
            return { name: app.name, status: true as const };
          } catch {
            return { name: app.name, status: false as const };
          }
        }),
      );

      results.forEach(({ name, status }) => {
        statuses[name] = status;
      });

      setAppStatuses(statuses);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check app statuses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAll();
    
    const intervalId = setInterval(checkAll, STATUS_CHECK_INTERVAL_MS);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [checkAll]);

  return {
    appStatuses,
    isLoading,
    error,
    refresh: checkAll,
  };
}
