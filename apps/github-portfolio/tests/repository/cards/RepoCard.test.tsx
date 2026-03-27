import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { RepoCard } from "@/components/repository/cards/RepoCard";

const mockRepo = { id: 1, name: "test", description: "Desc", language: "TS", stargazers_count: 100, html_url: "https://github.com/user/test", has_issues: true, forks_count: 10, open_issues_count: 5, updated_at: new Date().toISOString() };

describe("RepoCard", () => {
  it("renders", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.querySelector("a")).toBeInTheDocument();
  });

  it("hides language when null", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, language: null }} />);
    expect(container.textContent).not.toMatch(/Unknown/);
  });

  it("hides forks when 0", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, forks_count: 0 }} />);
    expect(container.textContent).not.toMatch(/\b0\b/);
  });

  it("hides issues when 0", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, open_issues_count: 0 }} />);
    expect(container.textContent).not.toMatch(/issues/);
  });
});
