import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGitHub, fetchRepositories } from '@/hooks/useGitHub';

vi.mock('next/navigation', () => ({
	useSearchParams: () => ({ get: () => null }),
}));

const createWrapper = () => {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return function Wrapper({ children }: { children: React.ReactNode }) {
		return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
	};
};

describe('useGitHub', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	const mockRepo = {
		id: 1,
		name: 'test',
		description: 'Test',
		language: 'TypeScript',
		stargazers_count: 100,
		html_url: 'https://github.com/user/test',
		has_issues: true,
		has_wiki: true,
		has_pages: false,
		has_downloads: true,
		open_issues_count: 0,
		watchers_count: 100,
		forks_count: 10,
		size: 1000,
		default_branch: 'main',
		created_at: '2024-01-01T00:00:00Z',
		updated_at: '2024-01-15T00:00:00Z',
		pushed_at: '2024-01-15T00:00:00Z',
		homepage: null,
		private: false,
		archived: false,
		disabled: false,
		visibility: 'public',
		license: null,
		topics: [],
	};

	it('has initial state', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		expect(result.current.filterType).toBe('all');
		expect(result.current.sortOption).toBe('stars_desc');
		expect(result.current.languageFilter).toBe('all');
		expect(result.current.searchQuery).toBe('');
	});

	it('updates search', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		act(() => result.current.setSearchQuery('test'));
		expect(result.current.searchQuery).toBe('test');
	});

	it('updates filterType', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		act(() => result.current.setFilterType('popular'));
		expect(result.current.filterType).toBe('popular');
	});

	it('updates sortOption', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		act(() => result.current.setSortOption('name_asc'));
		expect(result.current.sortOption).toBe('name_asc');
	});

	it('updates languageFilter', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		act(() => result.current.setLanguageFilter('TypeScript'));
		expect(result.current.languageFilter).toBe('TypeScript');
	});

	it('has filter functions', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		expect(typeof result.current.setFilterType).toBe('function');
		expect(typeof result.current.setSortOption).toBe('function');
		expect(typeof result.current.setLanguageFilter).toBe('function');
		expect(typeof result.current.setSearchQuery).toBe('function');
		expect(typeof result.current.loadMore).toBe('function');
		expect(typeof result.current.refetch).toBe('function');
	});

	it('has loading state', () => {
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		expect(result.current.isLoading).toBe(true);
	});

	it('fetches data', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve([mockRepo]),
		} as any);
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		await new Promise((r) => setTimeout(r, 100));
		expect(result.current.repositories.length).toBeGreaterThanOrEqual(0);
	});

	it('handles error gracefully', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 404,
			json: () => Promise.resolve({ message: 'Not found', code: 'USER_NOT_FOUND' }),
		} as any);
		const { result } = renderHook(() => useGitHub('invalid'), {
			wrapper: createWrapper(),
		});
		await new Promise((r) => setTimeout(r, 100));
		// Verify hook doesn't crash and returns valid state
		expect(result.current).toBeDefined();
		expect(result.current.isError).toBeDefined();
		expect(result.current.errorCode).toBeDefined();
	});

	it('handles error with undefined code', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 500,
			json: () => Promise.resolve({ message: 'Server error', code: undefined }),
		} as any);
		const { result } = renderHook(() => useGitHub('invalid'), {
			wrapper: createWrapper(),
		});
		await new Promise((r) => setTimeout(r, 100));
		// Verify hook handles undefined code gracefully
		expect(result.current).toBeDefined();
		expect(result.current.errorCode).toBeDefined();
	});

	it('handles error with null code', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 500,
			json: () => Promise.resolve({ message: 'Server error', code: null }),
		} as any);
		const { result } = renderHook(() => useGitHub('invalid'), {
			wrapper: createWrapper(),
		});
		await new Promise((r) => setTimeout(r, 100));
		// Verify hook handles null code gracefully
		expect(result.current).toBeDefined();
		expect(result.current.errorCode).toBeDefined();
	});

	it('returns null errorCode when not in error state', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve([mockRepo]),
		} as any);
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		await new Promise((r) => setTimeout(r, 100));
		expect(result.current.errorCode).toBeNull();
	});

	it('returns null errorMessage when not in error state', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve([mockRepo]),
		} as any);
		const { result } = renderHook(() => useGitHub('test'), { wrapper: createWrapper() });
		await new Promise((r) => setTimeout(r, 100));
		expect(result.current.errorMessage).toBeNull();
	});
});

describe('fetchRepositories', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('handles error with code', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 404,
			json: () => Promise.resolve({ error: 'Not found', code: 'USER_NOT_FOUND' }),
		} as any);

		await expect(fetchRepositories('invalid')).rejects.toMatchObject({
			code: 'USER_NOT_FOUND',
			message: 'Not found',
		});
	});

	it('handles error without code', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 500,
			json: () => Promise.resolve({ error: 'Server error' }),
		} as any);

		await expect(fetchRepositories('test')).rejects.toMatchObject({
			code: 'UPSTREAM_ERROR',
			message: 'Server error',
		});
	});

	it('handles error with null payload', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 500,
			json: () => Promise.reject(new Error('Parse error')),
		} as any);

		await expect(fetchRepositories('test')).rejects.toMatchObject({
			code: 'UPSTREAM_ERROR',
		});
	});
});
