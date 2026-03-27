'use client';

import { apps } from '@/lib/apps-config';
import { Header } from '@/components/features/Header';
import { SummaryCard } from '@/components/features/SummaryCard';
import { AppRow } from '@/components/features/AppRow';
import { useAppStatus } from '@/hooks/useAppStatus';
import { useCurrentTime } from '@/hooks/useCurrentTime';

/**
 * Main dashboard page component.
 * Displays a list of applications with their status and allows launching them.
 */
export default function Home() {
  const { appStatuses } = useAppStatus();
  const currentTime = useCurrentTime();

  const onlineCount = Object.values(appStatuses).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onlineCount={onlineCount}
        totalCount={apps.length}
        currentTime={currentTime}
      />

      <main id="main-content" className="p-6">
        <div className="max-w-5xl mx-auto">
          <SummaryCard onlineCount={onlineCount} totalCount={apps.length} />

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-5 py-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Applications</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {apps.map((app) => (
                <AppRow
                  key={app.name}
                  app={app}
                  status={appStatuses[app.name]}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
