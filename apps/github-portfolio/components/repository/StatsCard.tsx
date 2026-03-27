import { formatNumber } from "@/lib/stats";

interface StatsCardProps {
  displayedCount: number;
  filteredCount: number;
  totalStars: number;
  uniqueLanguages: string[];
  isLoading?: boolean;
}

export function StatsCard({ displayedCount, filteredCount, totalStars, uniqueLanguages, isLoading = false }: StatsCardProps) {
  if (isLoading) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Repository statistics and summary</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <span>Showing <strong className="text-gray-900">{displayedCount}</strong> of <strong className="text-gray-900">{filteredCount}</strong> repositories</span>
        <span className="text-gray-300">|</span>
        <span>Total Stars: <strong className="text-yellow-600">{formatNumber(totalStars)}</strong></span>
        {uniqueLanguages.length > 0 && (
          <>
            <span className="text-gray-300">|</span>
            <span>Languages: <strong className="text-gray-900">{uniqueLanguages.length}</strong></span>
          </>
        )}
      </div>
    </div>
  );
}
