import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from '../../../components/ProductFeedbackForm/Inputs/StarRating/StarRating';

describe('StarRating', () => {
	const defaultProps = {
		maxRating: 5,
		formData: { rating: 0, review: '' },
		handleRatingChange: vi.fn(),
	};

	it('should render 5 stars with accessibility', () => {
		render(<StarRating {...defaultProps} />);
		expect(screen.getAllByRole('radio')).toHaveLength(5);
		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'aria-label',
			'Rate your experience',
		);
	});

	it('should increment rating with arrow keys', () => {
		const handleRatingChange = vi.fn();
		const { container } = render(
			<StarRating
				{...defaultProps}
				handleRatingChange={handleRatingChange}
			/>,
		);
		const radiogroup = container.querySelector('[role="radiogroup"]')!;

		fireEvent.keyDown(radiogroup, { key: 'ArrowRight' });
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 1);

		handleRatingChange.mockClear();
		const { container: container2 } = render(
			<StarRating
				{...defaultProps}
				formData={{ rating: 2, review: '' }}
				handleRatingChange={handleRatingChange}
			/>,
		);
		fireEvent.keyDown(container2.querySelector('[role="radiogroup"]')!, {
			key: 'ArrowUp',
		});
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 3);
	});

	it('should decrement rating with arrow keys', () => {
		const handleRatingChange = vi.fn();
		const { container } = render(
			<StarRating
				{...defaultProps}
				formData={{ rating: 3, review: '' }}
				handleRatingChange={handleRatingChange}
			/>,
		);
		fireEvent.keyDown(container.querySelector('[role="radiogroup"]')!, {
			key: 'ArrowLeft',
		});
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 2);

		handleRatingChange.mockClear();
		const { container: container2 } = render(
			<StarRating
				{...defaultProps}
				formData={{ rating: 4, review: '' }}
				handleRatingChange={handleRatingChange}
			/>,
		);
		fireEvent.keyDown(container2.querySelector('[role="radiogroup"]')!, {
			key: 'ArrowDown',
		});
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 3);
	});

	it('should not exceed bounds with keyboard', () => {
		const handleRatingChange = vi.fn();
		const { container } = render(
			<StarRating
				{...defaultProps}
				formData={{ rating: 5, review: '' }}
				handleRatingChange={handleRatingChange}
			/>,
		);
		fireEvent.keyDown(container.querySelector('[role="radiogroup"]')!, {
			key: 'ArrowRight',
		});
		expect(handleRatingChange).not.toHaveBeenCalled();

		handleRatingChange.mockClear();
		const { container: container2 } = render(
			<StarRating
				{...defaultProps}
				formData={{ rating: 1, review: '' }}
				handleRatingChange={handleRatingChange}
			/>,
		);
		fireEvent.keyDown(container2.querySelector('[role="radiogroup"]')!, {
			key: 'ArrowLeft',
		});
		expect(handleRatingChange).not.toHaveBeenCalled();
	});

	it('should support Home and End keys', () => {
		const handleRatingChange = vi.fn();
		const { container } = render(
			<StarRating
				{...defaultProps}
				formData={{ rating: 3, review: '' }}
				handleRatingChange={handleRatingChange}
			/>,
		);

		fireEvent.keyDown(container.querySelector('[role="radiogroup"]')!, { key: 'Home' });
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 1);

		handleRatingChange.mockClear();
		fireEvent.keyDown(container.querySelector('[role="radiogroup"]')!, { key: 'End' });
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 5);
	});

	it('should call handleRatingChange when star is clicked', () => {
		const handleRatingChange = vi.fn();
		render(
			<StarRating
				{...defaultProps}
				handleRatingChange={handleRatingChange}
			/>,
		);
		fireEvent.click(screen.getByLabelText('3 Stars'));
		expect(handleRatingChange).toHaveBeenCalledWith('rating', 3);
	});
});
