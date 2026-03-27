import { describe, expect, it } from "vitest";
import * as hooks from "@/hooks";
import * as common from "@/components/common";
import * as filters from "@/components/filters";
import * as repository from "@/components/repository";

describe("Barrel exports", () => {
  it("exports all hooks", () => {
    expect(hooks.useGitHub).toBeDefined();
    expect(hooks.useFilterState).toBeDefined();
    expect(hooks.usePagination).toBeDefined();
    expect(hooks.useSearchQuery).toBeDefined();
  });

  it("exports all common components", () => {
    expect(common.Button).toBeDefined();
    expect(common.ScrollToTop).toBeDefined();
    expect(common.SectionHeading).toBeDefined();
    expect(common.Skeleton).toBeDefined();
    expect(common.SkipLink).toBeDefined();
    expect(common.UnauthenticatedRateLimitNotice).toBeDefined();
  });

  it("exports all filter components", () => {
    expect(filters.FilterSection).toBeDefined();
    expect(filters.LanguageFilter).toBeDefined();
    expect(filters.SearchInput).toBeDefined();
    expect(filters.SortSelect).toBeDefined();
    expect(filters.TypeFilters).toBeDefined();
  });

  it("exports all repository components", () => {
    expect(repository.RepoList).toBeDefined();
    expect(repository.RepoCard).toBeDefined();
    expect(repository.RepoGrid).toBeDefined();
    expect(repository.StatsCard).toBeDefined();
    expect(repository.LoadingState).toBeDefined();
    expect(repository.ErrorState).toBeDefined();
    expect(repository.EmptyState).toBeDefined();
    expect(repository.RepositoryGridSkeleton).toBeDefined();
  });
});
