'use client';

import * as React from 'react';

/**
 * Skip navigation link for keyboard accessibility.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
