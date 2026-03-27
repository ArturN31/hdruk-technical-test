import { useRef, useState } from 'react';
import { StarSymbol } from './StarSymbol';
import type { ProductFeedbackFormState } from '../../utils/ProductFeedbackFormAction';

interface StarRatingProps {
	maxRating: number;
	formData: ProductFeedbackFormState;
	handleRatingChange: (
		name: keyof Pick<ProductFeedbackFormState, 'rating' | 'review'>,
		value: string | number,
	) => void;
}

export const StarRating = ({
	maxRating,
	formData,
	handleRatingChange,
}: StarRatingProps) => {
	const starRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [hoveredRating, setHoveredRating] = useState<number>(0);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		const currentRating = formData.rating || 0;
		let newRating = currentRating;

		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				event.preventDefault();
				if (currentRating < maxRating) {
					newRating = currentRating + 1;
					handleRatingChange('rating', newRating);
				}
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				event.preventDefault();
				if (currentRating > 1) {
					newRating = currentRating - 1;
					handleRatingChange('rating', newRating);
				}
				break;
			case 'Home':
				event.preventDefault();
				newRating = 1;
				handleRatingChange('rating', newRating);
				break;
			case 'End':
				event.preventDefault();
				newRating = maxRating;
				handleRatingChange('rating', newRating);
				break;
		}

		if (newRating !== currentRating && newRating > 0)
			starRefs.current[newRating - 1]?.focus();
	};

	return (
		<div className='flex flex-col items-center gap-2 py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200'>
			<span className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
				Rate your experience
			</span>
			<div
				className='flex gap-1 w-fit m-5 place-self-center'
				role='radiogroup'
				aria-label='Rate your experience'
				onMouseLeave={() => setHoveredRating(0)}
				onKeyDown={handleKeyDown}>
				{Array.from({ length: maxRating }, (_, i) => {
					const starId = i + 1;
					const displayRating = hoveredRating || formData.rating;
					const isFilled = displayRating >= starId;
					const isHovered = hoveredRating >= starId;
					const isFocusable =
						formData.rating === 0 ? starId === 1 : starId === formData.rating;

					return (
						<StarSymbol
							key={`star-${starId}`}
							ref={(el) => {
								starRefs.current[starId - 1] = el;
							}}
							id={starId}
							handleRatingChange={handleRatingChange}
							setHoveredRating={setHoveredRating}
							isFilled={isFilled}
							isHovered={isHovered}
							isFocusable={isFocusable}
						/>
					);
				})}
			</div>
		</div>
	);
};
