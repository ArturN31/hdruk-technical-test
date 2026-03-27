import { StarRating } from './Inputs/StarRating/StarRating';
import { ProductFeedbackFormSubmitted } from './ProductFeedbackFormSubmitted';
import { ReviewInput } from './Inputs/ReviewInput';
import { FormButtons } from './FormButtons';
import { FormErrors } from './FormErrors';
import { useProductFeedbackForm } from './utils/useProductFeedbackForm';

const FORM_ID = 'product-feedback-form';

export const ProductFeedbackForm = () => {
	const {
		formData,
		isPendingSubmit,
		isPendingReset,
		handleSubmit,
		handleReset,
		updateField,
	} = useProductFeedbackForm();

	if (formData.success) return <ProductFeedbackFormSubmitted handleReset={handleReset} />;

	return (
		<form
			id={FORM_ID}
			onSubmit={handleSubmit}
			className='bg-white shadow-xl shadow-slate-200/50 rounded-3xl w-full max-w-lg p-10 flex flex-col gap-8 border border-slate-100'>
			<div className='space-y-2 text-center'>
				<h1 className='text-3xl font-bold text-slate-900 tracking-tight'>
					Product Feedback
				</h1>
				<p className='text-slate-500 text-sm'>How was your experience with us?</p>
			</div>

			<FormErrors
				errors={formData.errors}
				formId={FORM_ID}
			/>

			<StarRating
				maxRating={5}
				formData={formData}
				handleRatingChange={updateField}
			/>

			<ReviewInput
				handleReviewChange={updateField}
				review={formData.review}
			/>

			<FormButtons
				isTransitioningReset={isPendingReset}
				isTransitioningSubmit={isPendingSubmit}
				handleReset={handleReset}
			/>
		</form>
	);
};
