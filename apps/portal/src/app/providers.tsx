'use client';

import * as React from 'react';

/**
 * Providers component that wraps the application with context providers.
 */
export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
