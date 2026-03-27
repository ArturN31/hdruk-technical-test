import type { GitHubRepository } from "@/types/github";
import { RepoCard } from "./RepoCard";
import { Button } from "@/components/common/Button";

interface RepoGridProps {
  repositories: GitHubRepository[];
  hasMore: boolean;
  loadMore: () => void;
}

export function RepoGrid({ repositories, hasMore, loadMore }: RepoGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {hasMore && (
        <div className="border-t border-gray-200 px-5 py-4">
          <Button onClick={loadMore} variant="outline" className="w-full">
            Load More Repositories
          </Button>
        </div>
      )}
    </>
  );
}
