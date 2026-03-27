import { Skeleton } from "@/components/common/Skeleton";

type RepositoryGridSkeletonProps = {
  count?: number;
};

export function RepositoryGridSkeleton({ count = 6 }: RepositoryGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="grid">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={`skeleton-${idx}`} className="border-b border-gray-100 p-5 last:border-b-0">
          <div className="flex items-start justify-between mb-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="space-y-2 mb-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-3.5 w-16" />
            </div>
            <Skeleton className="h-3.5 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
