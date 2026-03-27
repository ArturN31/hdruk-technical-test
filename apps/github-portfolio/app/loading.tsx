import { Skeleton } from "@/components/common/Skeleton";
import { RepositoryGridSkeleton } from "@/components/repository/states/RepositoryGridSkeleton";

export default function Loading() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        <header className="flex flex-col gap-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </header>

        <main className="mt-8 pb-16">
          <div className="mb-6 flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full sm:w-48" />
          </div>

          <RepositoryGridSkeleton count={9} />
        </main>
      </div>
    </div>
  );
}
