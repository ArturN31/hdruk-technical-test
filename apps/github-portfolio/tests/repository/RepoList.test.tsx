import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepoList } from '@/components/repository/RepoList';

vi.mock('next/navigation', () => ({
	useSearchParams: () => ({ get: () => null }),
}));

const createWrapper = () => {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return function Wrapper({ children }: { children: React.ReactNode }) {
		return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
	};
};

describe('RepoList', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'fetch',
			vi
				.fn()
				.mockResolvedValue({
					ok: true,
					json: () => Promise.resolve({ repositories: [] }),
				}),
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('renders', async () => {
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.querySelector('section')).toBeInTheDocument();
		});
	});

	it('shows Overview', async () => {
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.textContent).toMatch(/Overview/);
		});
	});

	it('uses default user', async () => {
		render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining('vercel'),
				expect.any(Object),
			);
		});
	});

	it('has aria-live', async () => {
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
		});
	});

	it('shows empty state', async () => {
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.textContent).toMatch(/No repositories found/);
		});
	});

	it('has clear filters button', async () => {
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.textContent).toMatch(/Clear all filters/);
		});
	});

	it('clear button is clickable', async () => {
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.textContent).toMatch(/No repositories found/);
		});
		const clearButtons = screen.getAllByRole('button', { name: /clear all filters/i });
		expect(clearButtons.length).toBeGreaterThan(0);
		expect(clearButtons[0]).not.toBeDisabled();
		fireEvent.click(clearButtons[0]);
		// Button click should not crash the component
		expect(container.querySelector('section')).toBeInTheDocument();
	});

	it('shows loading state', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockImplementation(() => new Promise(() => {})),
		);
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.textContent).toMatch(/loading repositories/i);
		});
	});

	it('renders without crashing on error', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.querySelector('section')).toBeInTheDocument();
		});
	});

	it('shows repo grid with repos', async () => {
		const mockRepos = [
			{
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
			},
		];
		vi.stubGlobal(
			'fetch',
			vi
				.fn()
				.mockResolvedValue({
					ok: true,
					json: () => Promise.resolve({ repositories: mockRepos }),
				}),
		);
		const { container } = render(<RepoList />, { wrapper: createWrapper() });
		await waitFor(() => {
			expect(container.textContent).toMatch(/test/i);
		});
	});
});
