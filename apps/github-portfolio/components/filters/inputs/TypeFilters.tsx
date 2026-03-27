const FILTER_OPTIONS: { value: string; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'with_description', label: 'Description' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'has_issues', label: 'Issues' },
	{ value: 'has_wiki', label: 'Wiki' },
];

export interface TypeFiltersProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function TypeFilters({ value, onChange, className = '' }: TypeFiltersProps) {
	return (
		<div className={`w-full ${className}`}>
			<div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap sm:pb-0'>
				{FILTER_OPTIONS.map((option) => {
					const isActive = value === option.value;
					return (
						<button
							key={option.value}
							type='button'
							onClick={() => onChange(option.value)}
							className={[
								'shrink-0 font-medium rounded-full border transition-all duration-200',
								'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1',
								'cursor-pointer active:scale-95',
								'px-4 py-2.5 text-sm',
								isActive ?
									'bg-teal-600 text-white border-teal-600'
								:	'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400',
							].join(' ')}
							aria-pressed={isActive}>
							{option.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
