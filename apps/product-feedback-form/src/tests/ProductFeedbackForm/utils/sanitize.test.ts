import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../../../components/ProductFeedbackForm/utils/sanitize';

describe('sanitizeInput', () => {
	it('should trim whitespace', () => {
		expect(sanitizeInput('  Hello  ')).toBe('Hello');
	});

	it('should remove HTML tags', () => {
		expect(sanitizeInput('<p>Hello</p>')).toBe('Hello');
		expect(sanitizeInput('<div><span>Nested</span></div>')).toBe('Nested');
	});

	it('should remove script tags and event handlers', () => {
		expect(sanitizeInput('<script>alert("XSS")</script>')).toBe('');
		expect(sanitizeInput('<img onerror="alert(1)">')).toBe('');
	});

	it('should remove javascript: URLs', () => {
		expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
	});

	it('should handle mixed XSS attempts', () => {
		expect(sanitizeInput('<script>alert(1)</script><img onerror="alert(2)">')).toBe('');
	});

	it('should preserve safe content', () => {
		expect(sanitizeInput('Product is 100% great! $99.99')).toBe(
			'Product is 100% great! $99.99',
		);
	});

	it('should handle empty string', () => {
		expect(sanitizeInput('')).toBe('');
	});
});
