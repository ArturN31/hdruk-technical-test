/**
 * GitHub repository data structure matching GitHub API response.
 */
export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  has_issues: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  open_issues_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  private: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  license: {
    key: string;
    name: string;
    url: string | null;
    spdx_id: string | null;
    node_id: string;
  } | null;
  topics: string[];
}

/**
 * GitHub API error codes for typed error handling.
 */
export type GitHubApiErrorCode = "USER_NOT_FOUND" | "RATE_LIMITED" | "UPSTREAM_ERROR";

/**
 * Success response from repository API.
 */
export interface ReposSuccessResponse {
  repositories: GitHubRepository[];
}

/**
 * Error response from repository API.
 */
export interface ReposErrorResponse {
  error: string;
  code: GitHubApiErrorCode;
}

/**
 * Repository sorting options for the UI.
 */
export type RepositorySortOption = "stars_desc" | "stars_asc" | "name_asc" | "name_desc";

/**
 * Repository filter types for the UI.
 */
export type RepositoryFilterType = "all" | "with_description" | "with_readme" | "has_issues" | "has_wiki" | "popular";
