import { useState, useEffect } from 'react';

/**
 * Hook to get the current time that updates every second.
 * 
 * @returns The current date/time
 */
export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return currentTime;
}
