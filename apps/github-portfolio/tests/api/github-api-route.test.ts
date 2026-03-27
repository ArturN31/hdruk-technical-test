import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const originalFetch = global.fetch;

describe('GitHub API Route', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});
	afterEach(() => {
		global.fetch = originalFetch;
	});

	const mockRepos = [
		{
			id: 1,
			name: 'test-repo',
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

	it('returns repositories successfully for valid user', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockRepos),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=test'),
		);
		const response = await GET(request);
		expect(response.ok).toBe(true);
	});

	it('uses default username when user param is missing', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockRepos),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(new URL('http://localhost:3001/api/github/repos'));
		const response = await GET(request);
		expect(response.ok).toBe(true);
		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('vercel'),
			expect.any(Object),
		);
	});

	it('uses default username when user param is empty', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockRepos),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user='),
		);
		const response = await GET(request);
		expect(response.ok).toBe(true);
		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('vercel'),
			expect.any(Object),
		);
	});

	it('uses default username when user param is whitespace only', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockRepos),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=   '),
		);
		const response = await GET(request);
		expect(response.ok).toBe(true);
		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('vercel'),
			expect.any(Object),
		);
	});

	it('returns 404 when user not found', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: false,
			status: 404,
			json: () => Promise.resolve({ message: 'Not found' }),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=invalid'),
		);
		const response = await GET(request);
		expect(response.status).toBe(404);
	});

	it('returns 403 when rate limited', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: false,
			status: 403,
			json: () => Promise.resolve({ message: 'Rate limited' }),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=test'),
		);
		const response = await GET(request);
		expect(response.status).toBe(403);
	});

	it('returns 429 when rate limited', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: false,
			status: 429,
			json: () => Promise.resolve({ message: 'Rate limited' }),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=test'),
		);
		const response = await GET(request);
		expect(response.status).toBe(429);
	});

	it('returns 500 for upstream error', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: false,
			status: 500,
			json: () => Promise.resolve({ message: 'Server error' }),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=test'),
		);
		const response = await GET(request);
		expect(response.status).toBe(500);
	});

	it('returns 502 for invalid response format', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve('invalid'),
		} as any);
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=test'),
		);
		const response = await GET(request);
		expect(response.status).toBe(502);
	});

	it('returns 400 for invalid username', async () => {
		const { GET } = await import('@/app/api/github/repos/route');
		const request = new NextRequest(
			new URL('http://localhost:3001/api/github/repos?user=invalid@user'),
		);
		const response = await GET(request);
		expect(response.status).toBe(400);
	});
});
