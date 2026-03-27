import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fetchRepositories } from "@/hooks/useGitHub";

describe("fetchRepositories", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const createMockResponse = (ok: boolean, status: number, data: unknown) => ({
    ok,
    status,
    json: () => Promise.resolve(data),
  } as Response);

  it("fetches repositories successfully", async () => {
    const mockRepos = [
      { id: 1, name: "test-repo", description: "Test", language: "TypeScript", stargazers_count: 100, html_url: "https://github.com/user/test", has_issues: true, has_wiki: true, has_pages: false, has_downloads: true, open_issues_count: 0, watchers_count: 100, forks_count: 10, size: 1000, default_branch: "main", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-15T00:00:00Z", pushed_at: "2024-01-15T00:00:00Z", homepage: null, private: false, archived: false, disabled: false, visibility: "public", license: null, topics: [] },
    ];

    vi.mocked(global.fetch).mockResolvedValueOnce(createMockResponse(true, 200, { repositories: mockRepos }));

    const result = await fetchRepositories("testuser");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("test-repo");
    expect(global.fetch).toHaveBeenCalledWith("/api/github/repos?user=testuser", {
      method: "GET",
      cache: "no-store",
    });
  });

  it("throws USER_NOT_FOUND error on 404", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      createMockResponse(false, 404, { error: "User not found", code: "USER_NOT_FOUND" })
    );

    await expect(fetchRepositories("invaliduser")).rejects.toMatchObject({
      code: "USER_NOT_FOUND",
      message: "User not found",
    });
  });

  it("throws RATE_LIMITED error on 403", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      createMockResponse(false, 403, { error: "Rate limited", code: "RATE_LIMITED" })
    );

    await expect(fetchRepositories("testuser")).rejects.toMatchObject({
      code: "RATE_LIMITED",
      message: "Rate limited",
    });
  });

  it("throws RATE_LIMITED error on 429", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      createMockResponse(false, 429, { error: "Rate limited", code: "RATE_LIMITED" })
    );

    await expect(fetchRepositories("testuser")).rejects.toMatchObject({
      code: "RATE_LIMITED",
      message: "Rate limited",
    });
  });

  it("throws UPSTREAM_ERROR on other status codes", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      createMockResponse(false, 500, { error: "Server error" })
    );

    await expect(fetchRepositories("testuser")).rejects.toMatchObject({
      code: "UPSTREAM_ERROR",
      message: "Server error",
    });
  });

  it("encodes username in URL", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      createMockResponse(true, 200, { repositories: [] })
    );

    await fetchRepositories("user with spaces");
    expect(global.fetch).toHaveBeenCalledWith("/api/github/repos?user=user%20with%20spaces", {
      method: "GET",
      cache: "no-store",
    });
  });
});
