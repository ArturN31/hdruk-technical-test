import { describe, expect, it } from 'vitest';
import {
	applyTypeFilter,
	applyLanguageFilter,
	applySearchFilter,
	applySorting,
	filterRepositories,
} from '@/lib/filters';

const mockRepos = [
	{
		name: 'repo-a',
		description: 'A repo',
		language: 'TypeScript',
		stargazers_count: 100,
		has_issues: true,
		has_wiki: true,
		open_issues_count: 5,
	},
	{
		name: 'repo-b',
		description: null,
		language: 'JavaScript',
		stargazers_count: 50,
		has_issues: false,
		has_wiki: false,
		open_issues_count: 0,
	},
	{
		name: 'repo-c',
		description: 'C repo',
		language: 'TypeScript',
		stargazers_count: 200,
		has_issues: true,
		has_wiki: false,
		open_issues_count: 3,
	},
];

describe('filters', () => {
	describe('applyTypeFilter', () => {
		it('returns all repos for all filter', () => {
			expect(applyTypeFilter(mockRepos as any, 'all')).toHaveLength(3);
		});

		it('filters by description', () => {
			expect(applyTypeFilter(mockRepos as any, 'with_description')).toHaveLength(2);
		});

		it('filters by popularity', () => {
			expect(applyTypeFilter(mockRepos as any, 'popular')).toHaveLength(3);
		});

		it('filters by issues', () => {
			expect(applyTypeFilter(mockRepos as any, 'has_issues')).toHaveLength(2);
		});

		it('filters by wiki', () => {
			expect(applyTypeFilter(mockRepos as any, 'has_wiki')).toHaveLength(1);
		});

		it('returns all for unknown filter', () => {
			expect(applyTypeFilter(mockRepos as any, 'unknown' as any)).toHaveLength(3);
		});
	});

	describe('applyLanguageFilter', () => {
		it('returns all repos for all filter', () => {
			expect(applyLanguageFilter(mockRepos as any, 'all')).toHaveLength(3);
		});

		it('filters by language', () => {
			expect(applyLanguageFilter(mockRepos as any, 'TypeScript')).toHaveLength(2);
		});

		it('returns empty for unknown language', () => {
			expect(applyLanguageFilter(mockRepos as any, 'Unknown')).toHaveLength(0);
		});
	});

	describe('applySearchFilter', () => {
		it('returns all repos for empty query', () => {
			expect(applySearchFilter(mockRepos as any, '')).toHaveLength(3);
		});

		it('returns all repos for whitespace query', () => {
			expect(applySearchFilter(mockRepos as any, '   ')).toHaveLength(3);
		});

		it('filters by name', () => {
			expect(applySearchFilter(mockRepos as any, 'repo-a')).toHaveLength(1);
		});

		it('is case insensitive', () => {
			expect(applySearchFilter(mockRepos as any, 'REPO-A')).toHaveLength(1);
		});

		it('returns empty for no matches', () => {
			expect(applySearchFilter(mockRepos as any, 'nonexistent')).toHaveLength(0);
		});
	});

	describe('applySorting', () => {
		it('sorts by stars descending', () => {
			expect(
				applySorting(mockRepos as any, 'stars_desc').map((r) => r.stargazers_count),
			).toEqual([200, 100, 50]);
		});

		it('sorts by stars ascending', () => {
			expect(
				applySorting(mockRepos as any, 'stars_asc').map((r) => r.stargazers_count),
			).toEqual([50, 100, 200]);
		});

		it('sorts by name ascending', () => {
			expect(applySorting(mockRepos as any, 'name_asc').map((r) => r.name)).toEqual([
				'repo-a',
				'repo-b',
				'repo-c',
			]);
		});

		it('sorts by name descending', () => {
			expect(applySorting(mockRepos as any, 'name_desc').map((r) => r.name)).toEqual([
				'repo-c',
				'repo-b',
				'repo-a',
			]);
		});

		it('uses default for unknown sort', () => {
			expect(applySorting(mockRepos as any, 'unknown' as any).map((r) => r.name)).toEqual(
				['repo-a', 'repo-b', 'repo-c'],
			);
		});

		it('sorts by name when stars are equal (stars_desc)', () => {
			const repos = [
				{ name: 'b-repo', stargazers_count: 100 },
				{ name: 'a-repo', stargazers_count: 100 },
			];
			expect(applySorting(repos as any, 'stars_desc').map((r) => r.name)).toEqual([
				'a-repo',
				'b-repo',
			]);
		});

		it('sorts by name when stars are equal (stars_asc)', () => {
			const repos = [
				{ name: 'b-repo', stargazers_count: 100 },
				{ name: 'a-repo', stargazers_count: 100 },
			];
			expect(applySorting(repos as any, 'stars_asc').map((r) => r.name)).toEqual([
				'a-repo',
				'b-repo',
			]);
		});

		it('sorts by name ascending explicitly', () => {
			const repos = [
				{ name: 'z-repo', stargazers_count: 100 },
				{ name: 'a-repo', stargazers_count: 200 },
			];
			expect(applySorting(repos as any, 'name_asc').map((r) => r.name)).toEqual([
				'a-repo',
				'z-repo',
			]);
		});

		it('sorts by name descending explicitly', () => {
			const repos = [
				{ name: 'a-repo', stargazers_count: 100 },
				{ name: 'z-repo', stargazers_count: 200 },
			];
			expect(applySorting(repos as any, 'name_desc').map((r) => r.name)).toEqual([
				'z-repo',
				'a-repo',
			]);
		});
	});

	describe('filterRepositories', () => {
		it('returns empty array for empty input', () => {
			expect(filterRepositories([], 'all', 'all', '', 'stars_desc')).toEqual([]);
		});

		it('returns empty array for null input', () => {
			expect(filterRepositories(null as any, 'all', 'all', '', 'stars_desc')).toEqual([]);
		});

		it('applies all filters combined', () => {
			const result = filterRepositories(
				mockRepos as any,
				'with_description',
				'TypeScript',
				'repo-a',
				'stars_desc',
			);
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe('repo-a');
		});

		it('applies filters in correct order', () => {
			const result = filterRepositories(mockRepos as any, 'all', 'all', '', 'stars_desc');
			expect(result.map((r) => r.stargazers_count)).toEqual([200, 100, 50]);
		});

		it('handles complex filter combination', () => {
			const result = filterRepositories(
				mockRepos as any,
				'has_issues',
				'all',
				'repo',
				'stars_asc',
			);
			expect(result).toHaveLength(2);
			expect(result.map((r) => r.name)).toEqual(['repo-a', 'repo-c']);
		});
	});
});
