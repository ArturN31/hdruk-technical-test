import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { RepoCard } from "@/components/repository/cards/RepoCard";

const mockRepo = {
  id: 1, name: "test-repo", description: "A test repository", language: "TypeScript",
  stargazers_count: 100, html_url: "https://github.com/user/test-repo", has_issues: true,
  forks_count: 10, open_issues_count: 5, updated_at: new Date().toISOString(),
};

describe("RepoCard", () => {
  it("renders name", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/test-repo/);
  });

  it("renders description", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/A test repository/);
  });

  it("shows no description when null", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, description: null }} />);
    expect(container.textContent).toMatch(/No description provided/);
  });

  it("renders stars", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/100/);
  });

  it("renders language", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/TypeScript/);
  });

  it("hides language when null", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, language: null }} />);
    expect(container.querySelector("[style*='color']")).not.toBeInTheDocument();
  });

  it("renders forks", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/10/);
  });

  it("hides forks when 0", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, forks_count: 0 }} />);
    expect(container.textContent).not.toMatch(/\b0\b/);
  });

  it("renders issues", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/issues/);
  });

  it("hides issues when 0", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, open_issues_count: 0 }} />);
    expect(container.textContent).not.toMatch(/issues/);
  });

  it("renders link", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "https://github.com/user/test-repo");
  });

  it("renders time", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.textContent).toMatch(/ago|Just now/);
  });

  it("has aria-label", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("aria-label", "Open test-repo on GitHub");
  });

  it("has card classes", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.firstChild).toHaveClass("border-b", "p-5");
  });

  it("has link classes", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.querySelector("a")).toHaveClass("block");
  });

  it("has heading classes", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    expect(container.querySelector("h2")).toHaveClass("text-base", "font-semibold");
  });

  it("has description classes", () => {
    const { container } = render(<RepoCard repo={mockRepo} />);
    const p = container.querySelectorAll("p")[0];
    expect(p).toHaveClass("text-sm", "text-gray-600");
  });

  it("shows large star count formatted", () => {
    const { container } = render(<RepoCard repo={{ ...mockRepo, stargazers_count: 1500 }} />);
    expect(container.textContent).toMatch(/1\.5k/);
  });

  it("shows just now for recent updates", () => {
    const recent = { ...mockRepo, updated_at: new Date().toISOString() };
    const { container } = render(<RepoCard repo={recent} />);
    expect(container.textContent).toMatch(/Just now/);
  });

  it("shows year ago for old updates", () => {
    const old = { ...mockRepo, updated_at: new Date("2024-01-01").toISOString() };
    const { container } = render(<RepoCard repo={old} />);
    expect(container.textContent).toMatch(/year/);
  });

  it("shows month ago for medium updates", () => {
    const medium = { ...mockRepo, updated_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() };
    const { container } = render(<RepoCard repo={medium} />);
    expect(container.textContent).toMatch(/month/);
  });

  it("shows week ago for recent updates", () => {
    const week = { ...mockRepo, updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() };
    const { container } = render(<RepoCard repo={week} />);
    expect(container.textContent).toMatch(/week/);
  });

  it("shows day ago for very recent updates", () => {
    const day = { ...mockRepo, updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() };
    const { container } = render(<RepoCard repo={day} />);
    expect(container.textContent).toMatch(/day/);
  });

  it("shows hour ago for very recent updates", () => {
    const hour = { ...mockRepo, updated_at: new Date(Date.now() - 60 * 60 * 1000).toISOString() };
    const { container } = render(<RepoCard repo={hour} />);
    expect(container.textContent).toMatch(/hour/);
  });

  it("shows minute ago for very recent updates", () => {
    const minute = { ...mockRepo, updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString() };
    const { container } = render(<RepoCard repo={minute} />);
    expect(container.textContent).toMatch(/minute/);
  });
});
