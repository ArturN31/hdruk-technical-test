const HTML_TAG_PATTERN = /<[^>]*>/g;
const SCRIPT_TAG_PATTERN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_PATTERN = /\s+on\w+\s*=\s*["'][^"']*["']/gi;
const JAVASCRIPT_URL_PATTERN = /javascript\s*:/gi;

export const sanitizeInput = (input: string): string => {
	let sanitized = input;

	sanitized = sanitized.replace(SCRIPT_TAG_PATTERN, '');
	sanitized = sanitized.replace(EVENT_HANDLER_PATTERN, '');
	sanitized = sanitized.replace(JAVASCRIPT_URL_PATTERN, '');
	sanitized = sanitized.replace(HTML_TAG_PATTERN, '');

	return sanitized.trim();
};
