import { forwardRef } from 'react';
import type { ProductFeedbackFormState } from '../../utils/ProductFeedbackFormAction';

interface StarSymbolProps {
	id: number;
	handleRatingChange: (
		name: keyof Pick<ProductFeedbackFormState, 'rating' | 'review'>,
		value: string | number,
	) => void;
	setHoveredRating: (id: number) => void;
	isFilled: boolean;
	isHovered: boolean;
	isFocusable: boolean;
}

export const StarSymbol = forwardRef<HTMLButtonElement, StarSymbolProps>(
	({ id, handleRatingChange, setHoveredRating, isFilled, isHovered, isFocusable }, ref) => {
		return (
			<button
				ref={ref}
				type='button'
				id={`star-${id}`}
				onMouseEnter={() => setHoveredRating(id)}
				onClick={() => handleRatingChange('rating', id)}
				aria-label={`${id} Star${id > 1 ? 's' : ''}`}
				aria-checked={isFilled}
				role='radio'
				tabIndex={isFocusable ? 0 : -1}
				className={`transition-transform active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer rounded-lg p-1 ${
					isHovered
						? 'text-amber-400'
						: isFilled
							? 'text-amber-500'
							: 'text-slate-300'
				}`}>
				<svg
					width='32'
					height='32'
					viewBox='0 0 24 24'
					fill={isFilled ? 'currentColor' : 'none'}
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
				</svg>
			</button>
		);
	},
);

StarSymbol.displayName = 'StarSymbol';
