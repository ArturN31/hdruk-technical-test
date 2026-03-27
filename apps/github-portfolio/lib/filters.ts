import type { GitHubRepository } from "@/types/github";

export function applyTypeFilter(
  repositories: GitHubRepository[],
  filterType: string
): GitHubRepository[] {
  if (filterType === "all") return repositories;

  return repositories.filter((repo) => {
    switch (filterType) {
      case "with_description":
        return repo.description !== null && repo.description.length > 0;
      case "popular":
        return repo.stargazers_count > 10;
      case "has_issues":
        return repo.has_issues && repo.open_issues_count > 0;
      case "has_wiki":
        return repo.has_wiki;
      default:
        return true;
    }
  });
}

export function applyLanguageFilter(
  repositories: GitHubRepository[],
  language: string
): GitHubRepository[] {
  if (language === "all") return repositories;
  return repositories.filter((repo) => repo.language === language);
}

export function applySearchFilter(
  repositories: GitHubRepository[],
  query: string
): GitHubRepository[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return repositories;

  return repositories.filter((repo) =>
    repo.name.toLowerCase().includes(normalizedQuery)
  );
}

export function applySorting(
  repositories: GitHubRepository[],
  sortOption: string
): GitHubRepository[] {
  return [...repositories].sort((a, b) => {
    switch (sortOption) {
      case "stars_desc":
        return b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name);
      case "stars_asc":
        return a.stargazers_count - b.stargazers_count || a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "name_asc":
      default:
        return a.name.localeCompare(b.name);
    }
  });
}

export function filterRepositories(
  repositories: GitHubRepository[],
  filterType: string,
  languageFilter: string,
  searchQuery: string,
  sortOption: string
): GitHubRepository[] {
  if (!repositories || repositories.length === 0) {
    return [];
  }

  const afterTypeFilter = applyTypeFilter(repositories, filterType);
  const afterLanguageFilter = applyLanguageFilter(afterTypeFilter, languageFilter);
  const afterSearchFilter = applySearchFilter(afterLanguageFilter, searchQuery);

  return applySorting(afterSearchFilter, sortOption);
}
