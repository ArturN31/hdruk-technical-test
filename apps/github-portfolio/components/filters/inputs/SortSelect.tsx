import type { RepositorySortOption } from '@/types/github';

const SORT_OPTIONS: {
	value: RepositorySortOption;
	label: string;
}[] = [
	{ value: 'stars_desc', label: 'Most Stars' },
	{ value: 'stars_asc', label: 'Fewest Stars' },
	{ value: 'name_asc', label: 'Name (A-Z)' },
	{ value: 'name_desc', label: 'Name (Z-A)' },
];

export interface SortSelectProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function SortSelect({ value, onChange, className = '' }: SortSelectProps) {
	const currentOption = SORT_OPTIONS.find((opt) => opt.value === value);

	return (
		<div className={`relative ${className}`}>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-label='Sort repositories'
				title={currentOption?.label}
				className={[
					'appearance-none rounded-lg border border-gray-300 bg-white',
					'py-2.5 pl-4 pr-10 text-sm font-medium min-h-11',
					'text-gray-600 hover:text-gray-700',
					'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-shadow',
					'hover:border-gray-400 hover:bg-gray-50',
					'cursor-pointer transition-colors',
				].join(' ')}>
				{SORT_OPTIONS.map((option) => (
					<option
						key={option.value}
						value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<svg
				className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
				aria-hidden='true'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M19 9l-7 7-7-7'
				/>
			</svg>
		</div>
	);
}
