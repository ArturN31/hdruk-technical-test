"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * App-level providers container for client-side state libraries.
 */
export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't refetch on window focus to prevent unnecessary reloads
            refetchOnWindowFocus: false,
            // Don't refetch when reconnecting
            refetchOnReconnect: false,
            // Only refetch when data is stale
            refetchOnMount: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

