import { describe, it, expect } from 'vitest';
import {
	validateForm,
	ERROR_MESSAGES,
} from '../../../components/ProductFeedbackForm/utils/formValidation';

describe('validateForm', () => {
	it('should return error when rating is 0', () => {
		const result = validateForm({ rating: 0, review: 'This is a valid review text.' });
		expect(result.isValid).toBe(false);
		expect(result.errors).toContain(ERROR_MESSAGES.RATING_REQUIRED);
	});

	it('should return error when rating is invalid', () => {
		expect(validateForm({ rating: -1, review: 'Valid review text.' }).isValid).toBe(
			false,
		);
		expect(validateForm({ rating: 6, review: 'Valid review text.' }).isValid).toBe(false);
	});

	it('should return error when review is empty', () => {
		expect(validateForm({ rating: 5, review: '' }).errors).toContain(
			ERROR_MESSAGES.REVIEW_REQUIRED,
		);
	});

	it('should return error when review is too short', () => {
		expect(validateForm({ rating: 5, review: 'Short' }).errors).toContain(
			ERROR_MESSAGES.REVIEW_TOO_SHORT,
		);
	});

	it('should pass validation for review with exactly 10 characters', () => {
		expect(validateForm({ rating: 5, review: 'Exactly 10' }).isValid).toBe(true);
	});

	it('should return error when review is too long', () => {
		expect(validateForm({ rating: 5, review: 'a'.repeat(251) }).errors).toContain(
			ERROR_MESSAGES.REVIEW_TOO_LONG,
		);
	});

	it('should pass validation for review with exactly 250 characters', () => {
		expect(validateForm({ rating: 5, review: 'abcdefghij'.repeat(25) }).isValid).toBe(
			true,
		);
	});

	it('should return error for repetitive characters', () => {
		expect(
			validateForm({ rating: 5, review: 'Valid review with aaaaaa repetitive.' }).errors,
		).toContain(ERROR_MESSAGES.REVIEW_REPETITIVE);
	});

	it('should return multiple errors for multiple issues', () => {
		const result = validateForm({ rating: 0, review: '' });
		expect(result.isValid).toBe(false);
		expect(result.errors).toHaveLength(2);
	});

	it('should return no errors for valid input', () => {
		const result = validateForm({ rating: 4, review: 'This is a valid review text.' });
		expect(result.isValid).toBe(true);
		expect(result.errors).toBeUndefined();
	});

	it('should handle undefined values with nullish coalescing', () => {
		const result1 = validateForm({
			rating: undefined as unknown as number,
			review: 'Valid review text.',
		});
		expect(result1.errors).toContain(ERROR_MESSAGES.RATING_REQUIRED);

		const result2 = validateForm({ rating: 5, review: undefined as unknown as string });
		expect(result2.errors).toContain(ERROR_MESSAGES.REVIEW_REQUIRED);
	});
});
