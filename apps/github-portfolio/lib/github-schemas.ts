import { z } from "zod";

export const githubRepositorySchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number().int().nonnegative(),
  html_url: z.string().url(),
  has_issues: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(),
  has_downloads: z.boolean(),
  open_issues_count: z.number().int().nonnegative(),
  watchers_count: z.number().int().nonnegative(),
  forks_count: z.number().int().nonnegative(),
  size: z.number().int().nonnegative(),
  default_branch: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  homepage: z.string().nullable(),
  private: z.boolean(),
  archived: z.boolean(),
  disabled: z.boolean(),
  visibility: z.string(),
  license: z.object({
    key: z.string(),
    name: z.string(),
    url: z.string().nullable(),
    spdx_id: z.string().nullable(),
    node_id: z.string(),
  }).nullable(),
  topics: z.array(z.string()),
});

export const githubRepositoriesSchema = z.array(githubRepositorySchema);

export type GitHubRepository = z.infer<typeof githubRepositorySchema>;
export type ReposSuccessResponse = { repositories: GitHubRepository[] };
export type ReposErrorResponse = { error: string; code: GitHubApiErrorCode };
export type GitHubApiErrorCode = "USER_NOT_FOUND" | "RATE_LIMITED" | "UPSTREAM_ERROR";
