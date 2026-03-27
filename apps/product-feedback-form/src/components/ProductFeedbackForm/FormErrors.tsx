export const FormErrors = ({
	errors,
	formId,
}: {
	errors: string[] | undefined;
	formId?: string;
}) => {
	if (!errors || errors.length === 0) return null;

	const errorId = formId ? `${formId}-errors` : 'form-errors';

	return (
		<div
			id={errorId}
			role='alert'
			aria-live='assertive'
			className='bg-red-50 border border-red-100 rounded-xl px-4 py-3'>
			<ul className='text-red-600 text-xs font-medium space-y-1'>
				{errors.map((error) => (
					<li
						key={error}
						className='flex items-center gap-2'>
						<span className='w-1.5 h-1.5 bg-red-400 rounded-full' />
						{error}
					</li>
				))}
			</ul>
		</div>
	);
};
