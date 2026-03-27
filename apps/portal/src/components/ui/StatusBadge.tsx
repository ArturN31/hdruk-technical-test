import * as React from 'react';
import { STATUS_MESSAGES } from '@/lib/constants';
import type { StatusBadgeProps } from '@/types';

/**
 * Status badge component that displays the status of an application.
 * Uses color and text for accessibility.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const isChecking = status === null;
  const isOnline = status === true;

  const statusConfig = {
    checking: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      dot: 'bg-gray-400 animate-pulse',
      label: STATUS_MESSAGES.CHECKING,
    },
    online: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      label: STATUS_MESSAGES.ONLINE,
    },
    offline: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
      label: STATUS_MESSAGES.OFFLINE,
    },
  };

  const config = isChecking
    ? statusConfig.checking
    : isOnline
      ? statusConfig.online
      : statusConfig.offline;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      role="status"
      aria-live="polite"
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}
