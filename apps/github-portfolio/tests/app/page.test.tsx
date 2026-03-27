import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '@/app/page';

vi.mock('next/navigation', () => ({
	useSearchParams: () => ({ get: () => null }),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('Home', () => {
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
		const { container } = render(<Home />, { wrapper: Wrapper });
		await waitFor(() => {
			expect(container.querySelector('div')).toBeInTheDocument();
		});
	});

	it('renders header', async () => {
		const { container } = render(<Home />, { wrapper: Wrapper });
		await waitFor(() => {
			const headers = container.querySelectorAll('span.font-semibold');
			expect(headers.length).toBeGreaterThan(0);
		});
	});

	it('renders main content', async () => {
		const { container } = render(<Home />, { wrapper: Wrapper });
		await waitFor(() => {
			expect(container.querySelector('main')).toBeInTheDocument();
		});
	});

	it('renders Repository Explorer subtitle', async () => {
		const { container } = render(<Home />, { wrapper: Wrapper });
		await waitFor(() => {
			expect(container.textContent).toMatch(/Repository Explorer/);
		});
	});
});
