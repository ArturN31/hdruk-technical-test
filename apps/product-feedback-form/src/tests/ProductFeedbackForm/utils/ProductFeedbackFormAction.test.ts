import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductFeedbackFormAction } from '../../../components/ProductFeedbackForm/utils/ProductFeedbackFormAction';
import { ERROR_MESSAGES } from '../../../components/ProductFeedbackForm/utils/formValidation';
import * as sanitize from '../../../components/ProductFeedbackForm/utils/sanitize';

describe('ProductFeedbackFormAction', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it('should handle reset', async () => {
		const formData = new FormData();
		formData.append('reset', 'yes');
		const promise = ProductFeedbackFormAction(undefined, formData);
		await vi.advanceTimersByTimeAsync(1000);
		const result = await promise;
		expect(result).toEqual({ rating: 0, review: '', errors: undefined, success: false });
	});

	it('should return success for valid submission', async () => {
		const formData = new FormData();
		formData.append('rating', '4');
		formData.append('review', 'This is a valid review text.');
		const promise = ProductFeedbackFormAction(undefined, formData);
		await vi.advanceTimersByTimeAsync(1500);
		const result = await promise;
		expect(result.success).toBe(true);
		expect(result.review).toBe('This is a valid review text.');
	});

	it('should sanitize HTML and validate', async () => {
		const formData = new FormData();
		formData.append('rating', '4');
		formData.append('review', '<script>alert("XSS")</script>Valid review.');
		const promise = ProductFeedbackFormAction(undefined, formData);
		await vi.advanceTimersByTimeAsync(1500);
		const result = await promise;
		expect(result.success).toBe(true);
		expect(result.review).not.toContain('<script>');
	});

	it('should return validation errors', async () => {
		const formData = new FormData();
		formData.append('rating', '0');
		formData.append('review', 'Short');
		const result = await ProductFeedbackFormAction(undefined, formData);
		expect(result.success).toBe(false);
		expect(result.errors).toContain(ERROR_MESSAGES.RATING_REQUIRED);
	});

	it('should handle non-string FormData values', async () => {
		const formData = new FormData();
		const result = await ProductFeedbackFormAction(undefined, formData);
		expect(result.success).toBe(false);
		expect(result.rating).toBe(0);
		expect(result.review).toBe('');
	});

	it('should handle exception in catch block', async () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		vi.spyOn(sanitize, 'sanitizeInput').mockImplementation(() => {
			throw new Error('Test error');
		});

		const formData = new FormData();
		formData.append('rating', '4');
		formData.append('review', 'Test review');

		const result = await ProductFeedbackFormAction(undefined, formData);

		expect(result.success).toBe(false);
		expect(result.errors).toContain(ERROR_MESSAGES.GENERIC_ERROR);
		expect(consoleSpy).toHaveBeenCalled();

		consoleSpy.mockRestore();
	});
});
