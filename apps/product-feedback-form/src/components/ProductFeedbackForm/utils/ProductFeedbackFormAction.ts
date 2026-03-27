import { ERROR_MESSAGES, validateForm } from './formValidation';
import { sanitizeInput } from './sanitize';

export type ProductFeedbackFormState = {
	rating: number;
	review: string;
	errors?: string[];
	success?: boolean;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ProductFeedbackFormAction = async (
	_prevState: ProductFeedbackFormState | undefined,
	formData: FormData,
): Promise<ProductFeedbackFormState> => {
	try {
		if (formData.get('reset') === 'yes') {
			await delay(1000);
			return {
				rating: 0,
				review: '',
				errors: undefined,
				success: false,
			};
		}

		const ratingValue = formData.get('rating');
		const rating = typeof ratingValue === 'string' ? Number(ratingValue) : 0;

		const reviewValue = formData.get('review');
		const rawReview = typeof reviewValue === 'string' ? reviewValue : '';
		const review = sanitizeInput(rawReview);

		const validation = validateForm({ rating, review });

		if (!validation.isValid)
			return {
				rating,
				review,
				errors: validation.errors,
				success: false,
			};

		await delay(1500);

		return {
			rating,
			review,
			errors: undefined,
			success: true,
		};
	} catch (error) {
		console.error('[Product Feedback Form] Action Failure:', error);
		return {
			rating: 0,
			review: '',
			errors: [ERROR_MESSAGES.GENERIC_ERROR],
			success: false,
		};
	}
};
