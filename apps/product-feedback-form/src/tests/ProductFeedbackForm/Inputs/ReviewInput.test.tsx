import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewInput } from '../../../components/ProductFeedbackForm/Inputs/ReviewInput';

describe('ReviewInput', () => {
	const defaultProps = {
		review: '',
		handleReviewChange: vi.fn(),
	};

	it('should render textarea with label', () => {
		render(<ReviewInput {...defaultProps} />);
		expect(screen.getByLabelText('Your comments')).toBeInTheDocument();
	});

	it('should show character count with proper styling', () => {
		render(
			<ReviewInput
				{...defaultProps}
				review='Short review'
			/>,
		);
		expect(screen.getByText('238 characters remaining')).toHaveClass('text-slate-400');
	});

	it('should show amber warning when near limit', () => {
		const nearLimitReview = 'a'.repeat(235);
		render(
			<ReviewInput
				{...defaultProps}
				review={nearLimitReview}
			/>,
		);
		expect(screen.getByText('15 characters remaining')).toHaveClass('text-amber-600');
	});

	it('should show red error when over limit', () => {
		const overLimitReview = 'a'.repeat(260);
		render(
			<ReviewInput
				{...defaultProps}
				review={overLimitReview}
			/>,
		);
		expect(screen.getByText('-10 characters remaining')).toHaveClass('text-red-600');
	});

	it('should show character count at limit', () => {
		const limitReview = 'a'.repeat(250);
		render(
			<ReviewInput
				{...defaultProps}
				review={limitReview}
			/>,
		);
		expect(screen.getByText('0 characters remaining')).toBeInTheDocument();
		expect(screen.getByText('250/250')).toBeInTheDocument();
	});

	it('should call handleReviewChange on change', () => {
		const handleReviewChange = vi.fn();
		render(
			<ReviewInput
				review=''
				handleReviewChange={handleReviewChange}
			/>,
		);
		const textarea = screen.getByLabelText('Your comments');
		fireEvent.change(textarea, { target: { value: 'Test' } });
		expect(handleReviewChange).toHaveBeenCalledWith('review', 'Test');
	});
});
