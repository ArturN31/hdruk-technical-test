import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware for edge rate limiting and security headers.
 * Runs on the Edge Runtime for optimal performance.
 */

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = Number.parseInt(
	process.env.RATE_LIMIT_WINDOW_MS ?? '60000',
	10,
); // 1 minute default
const RATE_LIMIT_MAX_REQUESTS = Number.parseInt(
	process.env.RATE_LIMIT_MAX_REQUESTS ?? '10',
	10,
); // 10 requests per minute per IP

// In-memory rate limit store (note: resets on edge function cold start)
// For production, consider using Redis or Cloudflare KV
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if request is rate limited and return remaining count
 */
function checkRateLimit(ip: string): {
	limited: boolean;
	remaining: number;
	resetTime: number;
} {
	const now = Date.now();
	const record = requestCounts.get(ip);

	if (!record || now > record.resetTime) {
		requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
		return {
			limited: false,
			remaining: RATE_LIMIT_MAX_REQUESTS - 1,
			resetTime: now + RATE_LIMIT_WINDOW_MS,
		};
	}

	if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
		return { limited: true, remaining: 0, resetTime: record.resetTime };
	}

	record.count += 1;
	requestCounts.set(ip, record);
	return {
		limited: false,
		remaining: RATE_LIMIT_MAX_REQUESTS - record.count,
		resetTime: record.resetTime,
	};
}

/**
 * Get client IP from request headers
 */
function getClientIP(request: NextRequest): string {
	// Check x-forwarded-for header (most common for proxied requests)
	const forwardedFor = request.headers.get('x-forwarded-for');
	if (forwardedFor) {
		return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
	}

	// Check x-real-ip header (used by some proxies)
	const realIp = request.headers.get('x-real-ip');
	if (realIp) {
		return realIp;
	}

	// Fallback to socket address
	return 'unknown';
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Only apply rate limiting to API routes
	if (!pathname.startsWith('/api/')) {
		return NextResponse.next();
	}

	const clientIP = getClientIP(request);
	const { limited, remaining, resetTime } = checkRateLimit(clientIP);

	if (limited) {
		const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
		return NextResponse.json(
			{
				error: 'Too many requests. Please wait before trying again.',
				code: 'RATE_LIMITED',
			},
			{
				status: 429,
				headers: {
					'Retry-After': retryAfter.toString(),
					'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
					'X-RateLimit-Remaining': '0',
					'X-RateLimit-Reset': resetTime.toString(),
				},
			},
		);
	}

	// Add rate limit headers to successful responses
	const response = NextResponse.next();
	response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
	response.headers.set('X-RateLimit-Remaining', remaining.toString());
	response.headers.set('X-RateLimit-Reset', resetTime.toString());

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all API routes
		 */
		'/api/:path*',
	],
};
