import { describe, expect, it } from "vitest";

import { githubRepositorySchema, githubRepositoriesSchema } from "@/lib/github-schemas";

describe("GitHub Repository Schema", () => {
  const validRepo = {
    id: 1,
    name: "test-repo",
    description: "Test",
    language: "TypeScript",
    stargazers_count: 100,
    html_url: "https://github.com/user/test",
    has_issues: true,
    has_wiki: true,
    has_pages: false,
    has_downloads: true,
    open_issues_count: 0,
    watchers_count: 100,
    forks_count: 10,
    size: 1000,
    default_branch: "main",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    pushed_at: "2024-01-15T00:00:00Z",
    homepage: null,
    private: false,
    archived: false,
    disabled: false,
    visibility: "public",
    license: null,
    topics: [],
  };

  it("accepts valid repository payload with extra fields", () => {
    const result = githubRepositorySchema.safeParse(validRepo);
    expect(result.success).toBe(true);
  });

  it("rejects payloads missing required fields", () => {
    const invalidRepo = { id: 1 };
    const result = githubRepositorySchema.safeParse(invalidRepo);
    expect(result.success).toBe(false);
  });

  it("accepts nullable description and language", () => {
    const repoWithNulls = {
      ...validRepo,
      description: null,
      language: null,
    };
    const result = githubRepositorySchema.safeParse(repoWithNulls);
    expect(result.success).toBe(true);
  });

  it("validates an array of repositories", () => {
    const result = githubRepositoriesSchema.safeParse([validRepo, validRepo]);
    expect(result.success).toBe(true);
  });
});
