import { useActionState, useState, useTransition } from 'react';
import {
	ProductFeedbackFormAction,
	type ProductFeedbackFormState,
} from './ProductFeedbackFormAction';
import { validateForm } from './formValidation';

const INITIAL_FORM_STATE: Omit<ProductFeedbackFormState, 'errors' | 'success'> = {
	rating: 0,
	review: '',
};

export const useProductFeedbackForm = () => {
	const [formData, setFormData] = useState<ProductFeedbackFormState>({
		...INITIAL_FORM_STATE,
	});

	const [, formAction] = useActionState(
		async (_prevState: ProductFeedbackFormState, payload: FormData) => {
			const result = await ProductFeedbackFormAction(_prevState, payload);

			if (result)
				setFormData((prev) => ({
					...prev,
					errors: result.errors,
					success: result.success,
				}));
			return result;
		},
		INITIAL_FORM_STATE,
	);

	const [isPendingSubmit, startTransitionSubmit] = useTransition();
	const [isPendingReset, startTransitionReset] = useTransition();

	const updateField = (
		name: keyof Omit<ProductFeedbackFormState, 'errors' | 'success'>,
		value: string | number,
	) => {
		setFormData((prev) => {
			const updated = { ...prev, [name]: value };
			const validation = validateForm(updated);
			return {
				...updated,
				errors: validation.isValid ? undefined : validation.errors,
			};
		});
	};

	const handleSubmit = (event: React.SubmitEvent) => {
		event.preventDefault();
		const validation = validateForm(formData);

		if (!validation.isValid) {
			setFormData((prev) => ({ ...prev, errors: validation.errors }));
			return;
		}

		const submitData = new FormData();
		submitData.append('rating', formData.rating.toString());
		submitData.append('review', formData.review);

		startTransitionSubmit(() => {
			formAction(submitData);
		});
	};

	const handleReset = (skipConfirm: boolean = false) => {
		const hasData = formData.rating > 0 || formData.review.length > 0;
		if (
			!skipConfirm &&
			hasData &&
			!window.confirm(
				'Are you sure you want to reset the form? All entered data will be lost.',
			)
		)
			return;
		startTransitionReset(() => {
			const resetData = new FormData();
			resetData.append('reset', 'yes');
			formAction(resetData);
			setFormData({ ...INITIAL_FORM_STATE });
		});
	};

	const clearErrors = () => {
		setFormData((prev) => ({ ...prev, errors: undefined }));
	};

	return {
		formData,
		isPendingSubmit,
		isPendingReset,
		updateField,
		handleSubmit,
		handleReset,
		clearErrors,
	};
};
