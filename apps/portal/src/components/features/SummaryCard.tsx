import * as React from 'react';
import { STATUS_MESSAGES, STATUS_LABELS } from '@/lib/constants';
import type { SummaryCardProps } from '@/types';

/**
 * Summary card component that displays the overall system status.
 */
export function SummaryCard({ onlineCount, totalCount }: SummaryCardProps) {
  const allOnline = onlineCount === totalCount;
  const offlineCount = totalCount - onlineCount;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{STATUS_LABELS.SYSTEM_STATUS}</p>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${allOnline ? 'bg-emerald-500' : 'bg-amber-500'}`}
              aria-hidden="true"
            />
            <span className="text-base font-medium text-gray-900">
              {allOnline
                ? STATUS_MESSAGES.ALL_OPERATIONAL
                : STATUS_MESSAGES.SYSTEMS_OFFLINE(offlineCount)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-gray-900" aria-label={`${onlineCount} out of ${totalCount} applications online`}>
            {onlineCount}/{totalCount}
          </p>
          <p className="text-xs text-gray-500">{STATUS_LABELS.ONLINE}</p>
        </div>
      </div>
    </div>
  );
}
