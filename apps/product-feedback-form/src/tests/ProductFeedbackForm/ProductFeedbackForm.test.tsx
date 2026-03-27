/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFeedbackForm } from '../../components/ProductFeedbackForm/ProductFeedbackForm';
import {
	ERROR_MESSAGES,
	VALIDATION_CONSTANTS,
} from '../../components/ProductFeedbackForm/utils/formValidation';

const originalConfirm = window.confirm;

beforeAll(() => {
	window.confirm = vi.fn().mockReturnValue(true);
});

afterAll(() => {
	window.confirm = originalConfirm;
});

vi.mock('../components/ProductFeedbackForm/utils/ProductFeedbackFormAction', async () => {
	const actual = await vi.importActual(
		'../components/ProductFeedbackForm/utils/ProductFeedbackFormAction',
	);
	return {
		...actual,
		ProductFeedbackFormAction: vi.fn(async (_prevState, formData) => {
			if (formData.get('reset') === 'yes') {
				return { rating: 0, review: '', errors: undefined, success: false };
			}
			const ratingValue = formData.get('rating');
			const rating = typeof ratingValue === 'string' ? Number(ratingValue) : 0;
			const reviewValue = formData.get('review');
			const review = typeof reviewValue === 'string' ? reviewValue : '';
			if (rating >= 1 && rating <= 5 && review.length >= 10) {
				return { rating, review, errors: undefined, success: true };
			}
			return { rating, review, errors: [ERROR_MESSAGES.RATING_REQUIRED], success: false };
		}),
	};
});

describe('ProductFeedbackForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(window.confirm as ReturnType<typeof vi.fn>).mockReturnValue(true);
	});

	it('should render form elements', () => {
		render(<ProductFeedbackForm />);
		expect(screen.getByText('Product Feedback')).toBeInTheDocument();
		expect(screen.getByRole('radiogroup')).toBeInTheDocument();
		expect(screen.getByLabelText('Your comments')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});

	it('should show validation errors on submit', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		await user.click(screen.getByRole('button', { name: 'Submit' }));
		await waitFor(() => {
			expect(screen.getByText(ERROR_MESSAGES.RATING_REQUIRED)).toBeInTheDocument();
			expect(screen.getByText(ERROR_MESSAGES.REVIEW_REQUIRED)).toBeInTheDocument();
		});
	});

	it('should validate in real-time', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		const textarea = screen.getByLabelText('Your comments');
		await user.type(textarea, 'abc');
		expect(screen.getByText(ERROR_MESSAGES.REVIEW_TOO_SHORT)).toBeInTheDocument();
		await user.type(textarea, 'defghijklmnopqr');
		await waitFor(() => {
			expect(screen.queryByText(ERROR_MESSAGES.REVIEW_TOO_SHORT)).not.toBeInTheDocument();
		});
	});

	it('should select rating on star click', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		await user.click(screen.getByLabelText('3 Stars'));
		expect(screen.getByLabelText('3 Stars')).toHaveAttribute('aria-checked', 'true');
	});

	it('should show character counter', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		const textarea = screen.getByLabelText('Your comments');
		await user.type(textarea, 'Test review text');
		expect(screen.getByText(`${VALIDATION_CONSTANTS.MAX_REVIEW_LENGTH - 16} characters remaining`)).toBeInTheDocument();
	});

	it('should show repetitive character error', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		const textarea = screen.getByLabelText('Your comments');
		await user.type(textarea, 'a'.repeat(200));
		await waitFor(() => {
			expect(screen.getByText(ERROR_MESSAGES.REVIEW_REPETITIVE)).toBeInTheDocument();
		});
	});

	it('should clear form on reset', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		await user.click(screen.getByLabelText('3 Stars'));
		await user.type(screen.getByLabelText('Your comments'), 'Test review');
		await user.click(screen.getByRole('button', { name: 'Reset' }));
		await waitFor(() => {
			expect(screen.getByLabelText('Your comments')).toHaveValue('');
		});
	});

	it('should not reset when confirmation is cancelled', async () => {
		const user = userEvent.setup();
		(window.confirm as ReturnType<typeof vi.fn>).mockReturnValue(false);
		render(<ProductFeedbackForm />);
		await user.click(screen.getByLabelText('3 Stars'));
		await user.type(screen.getByLabelText('Your comments'), 'Test review');
		await user.click(screen.getByRole('button', { name: 'Reset' }));
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(screen.getByLabelText('Your comments')).toHaveValue('Test review');
	});

	it('should show success after valid submission', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		await user.click(screen.getByLabelText('4 Stars'));
		await user.type(screen.getByLabelText('Your comments'), 'This is a valid review text.');
		await user.click(screen.getByRole('button', { name: 'Submit' }));
		await waitFor(() => {
			expect(screen.getByText('Thank you!')).toBeInTheDocument();
		}, { timeout: 5000 });
	});

	it('should allow submitting another review', async () => {
		const user = userEvent.setup();
		render(<ProductFeedbackForm />);
		await user.click(screen.getByLabelText('4 Stars'));
		await user.type(screen.getByLabelText('Your comments'), 'This is a valid review text.');
		await user.click(screen.getByRole('button', { name: 'Submit' }));
		await waitFor(() => {
			expect(screen.getByText('Thank you!')).toBeInTheDocument();
		}, { timeout: 5000 });
		await user.click(screen.getByRole('button', { name: 'Submit another review' }));
		await waitFor(() => {
			expect(screen.getByText('Product Feedback')).toBeInTheDocument();
		}, { timeout: 3000 });
		expect(window.confirm).not.toHaveBeenCalled();
	});
});
