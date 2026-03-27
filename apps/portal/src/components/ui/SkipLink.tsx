'use client';

import * as React from 'react';

/**
 * Skip navigation link for keyboard accessibility.
 * Allows users to skip directly to main content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={[
        'sr-only focus:not-sr-only',
        'fixed top-4 left-4 z-50',
        'rounded-lg bg-teal-600 px-4 py-3 text-sm font-medium text-white',
        'focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2',
        'transition-transform duration-200',
        'focus:translate-y-0 -translate-y-10',
      ].join(' ')}
    >
      Skip to main content
    </a>
  );
}
