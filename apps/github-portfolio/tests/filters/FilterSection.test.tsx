import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { FilterSection } from "@/components/filters/FilterSection/FilterSection";

const mockRepos = [{ id: 1, name: "test", description: "Test", language: "TS", stargazers_count: 100, html_url: "https://github.com/user/test", has_issues: true, has_wiki: true, has_pages: false, has_downloads: true, open_issues_count: 0, watchers_count: 100, forks_count: 10, size: 1000, default_branch: "main", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-15T00:00:00Z", pushed_at: "2024-01-15T00:00:00Z", homepage: null, private: false, archived: false, disabled: false, visibility: "public", license: null, topics: [] }];

describe("FilterSection", () => {
  it("renders", () => {
    const { container } = render(<FilterSection searchQuery="" onSearchChange={() => {}} filterType="all" sortOption="stars_desc" languageFilter="all" onFilterTypeChange={() => {}} onSortOptionChange={() => {}} onLanguageFilterChange={() => {}} repositories={mockRepos} languages={["TS"]} />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });
});
