/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RepoGrid } from "@/components/repository/cards/RepoGrid";

const mockRepos = [
  { id: 1, name: "repo-1", description: "Desc 1", language: "TypeScript", stargazers_count: 100, html_url: "https://github.com/user/repo-1", has_issues: true, forks_count: 10, open_issues_count: 5, updated_at: new Date().toISOString() },
  { id: 2, name: "repo-2", description: "Desc 2", language: "JavaScript", stargazers_count: 200, html_url: "https://github.com/user/repo-2", has_issues: false, forks_count: 20, open_issues_count: 0, updated_at: new Date().toISOString() },
];

describe("RepoGrid", () => {
  it("renders repository cards", () => {
    render(<RepoGrid repositories={mockRepos as any} hasMore={false} loadMore={() => {}} />);
    expect(screen.getByText("repo-1")).toBeInTheDocument();
  });

  it("renders load more button when hasMore is true", () => {
    render(<RepoGrid repositories={mockRepos as any} hasMore loadMore={() => {}} />);
    expect(screen.getByRole("button", { name: /Load More/i })).toBeInTheDocument();
  });
});
