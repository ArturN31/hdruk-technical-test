import * as React from 'react';
import { STATUS_MESSAGES } from '@/lib/constants';
import type { LaunchButtonProps } from '@/types';

/**
 * Launch button component for opening applications.
 * Handles offline state and includes security attributes for external links.
 */
export function LaunchButton({ url, status, className = '' }: LaunchButtonProps) {
  const isOnline = status === true;
  const isChecking = status === null;
  const isOffline = status === false;
  const isEnabled = isOnline || isChecking;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isOffline) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={[
        'inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md transition-colors',
        isEnabled
          ? 'bg-teal-600 text-white hover:bg-teal-700'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed',
        className,
      ].join(' ')}
      aria-disabled={!isEnabled}
      title={isOffline ? STATUS_MESSAGES.OFFLINE : undefined}
    >
      <span>Launch</span>
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="group-hover:translate-x-0.5 transition-transform"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </a>
  );
}
