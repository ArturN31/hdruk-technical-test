import { useEffect, useState, type ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			if (event.error instanceof Error) {
				setError(event.error);
			} else if (event.message) {
				setError(new Error(event.message));
			}
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			if (event.reason instanceof Error) {
				setError(event.reason);
			} else if (typeof event.reason === 'string') {
				setError(new Error(event.reason));
			} else {
				setError(new Error('An unknown error occurred'));
			}
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleUnhandledRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleUnhandledRejection);
		};
	}, []);

	const handleReset = () => {
		setError(null);
	};

	if (error) {
		if (fallback) return fallback;

		return (
			<div className='bg-red-50 border border-red-100 rounded-3xl w-full max-w-lg p-10 text-center flex flex-col gap-6'>
				<div className='w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center self-center'>
					<svg
						width='40'
						height='40'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='3'>
						<line
							x1='12'
							y1='8'
							x2='12'
							y2='12'
						/>
						<line
							x1='12'
							y1='16'
							x2='12.01'
							y2='16'
						/>
						<path d='M12 2L22 20H2L12 2Z' />
					</svg>
				</div>
				<h2 className='text-2xl font-bold text-slate-900'>Something went wrong</h2>
				<p className='text-slate-500 text-sm'>
					{error.message || 'An unexpected error occurred.'}
				</p>
				<button
					onClick={handleReset}
					className='text-amber-600 font-semibold hover:underline cursor-pointer'>
					Try again
				</button>
			</div>
		);
	}

	return children;
};
