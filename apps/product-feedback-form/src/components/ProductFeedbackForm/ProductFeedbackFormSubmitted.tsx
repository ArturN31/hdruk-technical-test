export const ProductFeedbackFormSubmitted = ({
	handleReset,
}: {
	handleReset: (skipConfirm: boolean) => void;
}) => {
	return (
		<div className='bg-white shadow-xl rounded-3xl w-full max-w-lg p-10 text-center border border-slate-100 flex flex-col gap-6'>
			<div className='w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center self-center'>
				<svg
					width='40'
					height='40'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='3'>
					<polyline points='20 6 9 17 4 12' />
				</svg>
			</div>
			<h2 className='text-2xl font-bold text-slate-900'>Thank you!</h2>
			<p className='text-slate-500'>Your feedback helps us improve our products.</p>
			<button
				onClick={() => handleReset(true)}
				className='text-amber-600 font-semibold hover:underline cursor-pointer'>
				Submit another review
			</button>
		</div>
	);
};
