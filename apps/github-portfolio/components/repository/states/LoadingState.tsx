import { RepositoryGridSkeleton } from "./RepositoryGridSkeleton";

export function LoadingState() {
  return (
    <div className="p-5">
      <RepositoryGridSkeleton count={6} />
    </div>
  );
}
