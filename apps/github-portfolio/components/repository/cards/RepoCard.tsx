import { Star, GitFork, Circle, Clock } from "lucide-react";
import { getLanguageColor } from "@/lib/constants";
import { formatStarCount } from "@/lib/stats";

interface RepoCardProps {
  repo: {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    html_url: string;
    has_issues: boolean;
    forks_count: number;
    open_issues_count: number;
    updated_at: string;
  };
}

export function RepoCard({ repo }: RepoCardProps) {
  const languageColor = getLanguageColor(repo.language);
  const lastUpdated = new Date(repo.updated_at).toLocaleDateString();
  const timeAgo = getTimeAgo(new Date(repo.updated_at));

  return (
    <div className="group border-b border-gray-100 p-5 hover:bg-gray-50 transition-colors last:border-b-0">
      <a href={repo.html_url} target="_blank" rel="noreferrer" className="block" aria-label={`Open ${repo.name} on GitHub`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{repo.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums font-medium">{formatStarCount(repo.stargazers_count)}</span>
          </div>
        </div>

        {repo.description ? (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{repo.description}</p>
        ) : (
          <p className="text-sm text-gray-400 italic mb-3">No description provided</p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <Circle className="h-2.5 w-2.5" style={{ color: languageColor }} fill={languageColor} aria-hidden="true" />
              <span className="font-medium">{repo.language}</span>
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="tabular-nums font-medium">{formatStarCount(repo.forks_count)}</span>
            </div>
          )}
          {repo.open_issues_count > 0 && (
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
              <span className="tabular-nums font-medium">{repo.open_issues_count} issues</span>
            </div>
          )}
          <div className="flex items-center gap-1" title={lastUpdated}>
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium">{timeAgo}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"], [2592000, "month"], [604800, "week"], [86400, "day"], [3600, "hour"], [60, "minute"],
  ];

  for (const [secondsInInterval, label] of intervals) {
    const count = Math.floor(seconds / secondsInInterval);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}
