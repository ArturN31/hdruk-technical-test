import type { ProductFeedbackFormState } from './ProductFeedbackFormAction';

export const VALIDATION_CONSTANTS = {
	MIN_RATING: 1,
	MAX_RATING: 5,
	MIN_REVIEW_LENGTH: 10,
	MAX_REVIEW_LENGTH: 250,
	REPETITIVE_PATTERN: /(.)\1{4,}/,
} as const;

export const ERROR_MESSAGES = {
	RATING_REQUIRED: 'Please select a star rating.',
	RATING_INVALID: 'Rating must be between 1 and 5 stars.',
	REVIEW_REQUIRED: 'Please provide a written review.',
	REVIEW_TOO_SHORT: 'Your review is too short. Please provide at least 10 characters.',
	REVIEW_TOO_LONG: 'Your review exceeds the 250-character limit.',
	REVIEW_REPETITIVE: 'Your review contains too many repetitive characters.',
	GENERIC_ERROR: 'An unexpected system error occurred. Please try again.',
} as const;

export const validateForm = (formToValidate: ProductFeedbackFormState) => {
	const errors: string[] = [];
	const rating = formToValidate.rating ?? 0;
	const review = (formToValidate.review ?? '').trim();

	if (rating === 0) {
		errors.push(ERROR_MESSAGES.RATING_REQUIRED);
	} else if (
		rating < VALIDATION_CONSTANTS.MIN_RATING ||
		rating > VALIDATION_CONSTANTS.MAX_RATING
	) {
		errors.push(ERROR_MESSAGES.RATING_INVALID);
	}

	if (!review) {
		errors.push(ERROR_MESSAGES.REVIEW_REQUIRED);
	} else if (review.length < VALIDATION_CONSTANTS.MIN_REVIEW_LENGTH) {
		errors.push(ERROR_MESSAGES.REVIEW_TOO_SHORT);
	} else if (review.length > VALIDATION_CONSTANTS.MAX_REVIEW_LENGTH) {
		errors.push(ERROR_MESSAGES.REVIEW_TOO_LONG);
	}

	if (VALIDATION_CONSTANTS.REPETITIVE_PATTERN.test(review)) {
		errors.push(ERROR_MESSAGES.REVIEW_REPETITIVE);
	}

	const isValid = errors.length === 0;

	return {
		isValid,
		errors: isValid ? undefined : errors,
	};
};
