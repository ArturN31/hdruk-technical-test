import type { GitHubRepository } from "@/types/github";

/**
 * Calculate total stars across all repositories.
 * @param repositories - Array of repositories
 * @returns Total star count
 */
export function calculateTotalStars(repositories: GitHubRepository[]): number {
  return repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

/**
 * Get unique programming languages from repositories.
 * Returns sorted array of language names.
 * @param repositories - Array of repositories
 * @returns Sorted array of unique language names
 */
export function getUniqueLanguages(repositories: GitHubRepository[]): string[] {
  return Array.from(
    new Set(repositories.map((repo) => repo.language).filter(Boolean))
  ).sort() as string[];
}

/**
 * Format star count for display.
 * Shows "k" notation for values >= 1000.
 * @param value - Star count number
 * @returns Formatted string (e.g., "1.5k" or "999")
 */
export function formatStarCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
}

/**
 * Format large numbers with locale-specific separators.
 * @param value - Number to format
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted string with separators
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}
