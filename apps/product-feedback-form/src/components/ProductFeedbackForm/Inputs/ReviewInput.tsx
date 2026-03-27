import { VALIDATION_CONSTANTS } from '../utils/formValidation';
import type { ProductFeedbackFormState } from '../utils/ProductFeedbackFormAction';

interface ReviewInputProps {
	handleReviewChange: (
		name: keyof Pick<ProductFeedbackFormState, 'rating' | 'review'>,
		value: string | number,
	) => void;
	review: string;
}

export const ReviewInput = ({
	handleReviewChange,
	review,
}: ReviewInputProps) => {
	const characterCount = review.length;
	const remainingCharacters = VALIDATION_CONSTANTS.MAX_REVIEW_LENGTH - characterCount;
	const isOverLimit = remainingCharacters < 0;
	const isNearLimit = remainingCharacters <= 20 && remainingCharacters >= 0;

	return (
		<div className='flex flex-col gap-2'>
			<label
				htmlFor='review'
				className='text-sm font-semibold text-slate-700 ml-1'>
				Your comments
			</label>
			<textarea
				onChange={(e) =>
					handleReviewChange(
						e.target.name as keyof Pick<ProductFeedbackFormState, 'rating' | 'review'>,
						e.target.value,
					)
				}
				name='review'
				id='review'
				maxLength={VALIDATION_CONSTANTS.MAX_REVIEW_LENGTH}
				rows={4}
				className='w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all resize-none'
				placeholder='What did you like or dislike?'
				value={review}
			/>
			<div className='flex justify-between items-center px-1'>
				<span
					className={`text-xs font-medium ${
						isOverLimit
							? 'text-red-600'
							: isNearLimit
								? 'text-amber-600'
								: 'text-slate-400'
					}`}>
					{remainingCharacters} characters remaining
				</span>
				<span className='text-xs text-slate-400'>
					{characterCount}/{VALIDATION_CONSTANTS.MAX_REVIEW_LENGTH}
				</span>
			</div>
		</div>
	);
};
