export const FormButtons = ({
	isTransitioningSubmit,
	isTransitioningReset,
	handleReset,
}: {
	isTransitioningSubmit: boolean;
	isTransitioningReset: boolean;
	handleReset: () => void;
}) => {
	const isDisabled = isTransitioningReset || isTransitioningSubmit;

	return (
		<div className='grid grid-cols-2 gap-4'>
			<button
				type='submit'
				disabled={isDisabled}
				className='bg-amber-500 cursor-pointer hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'>
				{!isTransitioningSubmit ? 'Submit' : 'Submitting...'}
			</button>
			<button
				type='button'
				onClick={handleReset}
				disabled={isDisabled}
				className='bg-slate-100 cursor-pointer hover:bg-slate-200 text-slate-600 font-bold py-3 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'>
				{!isTransitioningReset ? 'Reset' : 'Resetting...'}
			</button>
		</div>
	);
};
