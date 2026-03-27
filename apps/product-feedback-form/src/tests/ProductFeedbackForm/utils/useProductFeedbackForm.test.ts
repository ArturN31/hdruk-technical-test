/* eslint-disable @typescript-eslint/unbound-method */

import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useProductFeedbackForm } from '../../../components/ProductFeedbackForm/utils/useProductFeedbackForm';
import { ERROR_MESSAGES } from '../../../components/ProductFeedbackForm/utils/formValidation';

vi.mock('../components/ProductFeedbackForm/utils/ProductFeedbackFormAction', async () => {
	const actual = await vi.importActual(
		'../../components/ProductFeedbackForm/utils/ProductFeedbackFormAction',
	);
	return {
		...actual,
		ProductFeedbackFormAction: vi.fn(),
	};
});

describe('useProductFeedbackForm', () => {
	it('should initialize with default state', () => {
		const { result } = renderHook(() => useProductFeedbackForm());
		expect(result.current.formData.rating).toBe(0);
		expect(result.current.formData.review).toBe('');
	});

	it('should update fields and validate', () => {
		const { result } = renderHook(() => useProductFeedbackForm());
		act(() => {
			result.current.updateField('rating', 4);
			result.current.updateField('review', 'Valid review text.');
		});
		expect(result.current.formData.rating).toBe(4);
		expect(result.current.formData.errors).toBeUndefined();
	});

	it('should set and clear errors', () => {
		const { result } = renderHook(() => useProductFeedbackForm());
		act(() => {
			result.current.updateField('review', 'Short');
		});
		expect(result.current.formData.errors).toContain(ERROR_MESSAGES.REVIEW_TOO_SHORT);

		act(() => {
			result.current.clearErrors();
		});
		expect(result.current.formData.errors).toBeUndefined();
	});

	it('should handle reset with confirmation', () => {
		const { result } = renderHook(() => useProductFeedbackForm());
		act(() => {
			result.current.updateField('rating', 4);
			result.current.updateField('review', 'Test review');
		});
		act(() => {
			result.current.handleReset();
		});
		expect(result.current.isPendingReset).toBeDefined();
	});

	it('should skip confirmation when form is empty', () => {
		const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
		const { result } = renderHook(() => useProductFeedbackForm());
		act(() => {
			result.current.handleReset();
		});
		expect(confirmSpy).not.toHaveBeenCalled();
		confirmSpy.mockRestore();
	});

	it('should prevent submit with invalid data', () => {
		const { result } = renderHook(() => useProductFeedbackForm());
		const mockEvent = { preventDefault: vi.fn() } as unknown as React.SubmitEvent;
		act(() => {
			result.current.handleSubmit(mockEvent);
		});
		expect(mockEvent.preventDefault).toHaveBeenCalled();
	});
});
