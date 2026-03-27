import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'outline';
};

export function Button({
	className = '',
	variant = 'primary',
	type = 'button',
	...props
}: ButtonProps) {
	const variantClasses =
		variant === 'secondary' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
		: variant === 'outline' ?
			'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
		:	'bg-teal-600 text-white hover:bg-teal-700';

	return (
		<button
			type={type}
			className={[
				'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer',
				variantClasses,
				className,
			].join(' ')}
			{...props}
		/>
	);
}
