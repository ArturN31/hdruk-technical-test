import { Languages } from 'lucide-react';

export interface LanguageFilterProps {
	languages: string[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function LanguageFilter({
	languages,
	value,
	onChange,
	className = '',
}: LanguageFilterProps) {
	if (languages.length === 0) return null;

	return (
		<div className={`flex flex-wrap items-center gap-2 ${className}`}>
			<label
				htmlFor='language-filter'
				className='text-sm font-medium text-gray-600'>
				Language:
			</label>
			<div className='relative'>
				<Languages
					className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none'
					aria-hidden='true'
				/>
				<select
					id='language-filter'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					aria-label='Filter by programming language'
					className={[
						'appearance-none rounded-lg border border-gray-300 bg-white font-medium',
						'py-2.5 pl-10 pr-10 text-sm min-h-11 max-w-50',
						'text-gray-600 hover:text-gray-700',
						'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-shadow',
						'cursor-pointer hover:border-gray-400 hover:bg-gray-50',
					].join(' ')}>
					<option value='all'>All</option>
					{languages.map((lang) => (
						<option
							key={lang}
							value={lang}>
							{lang}
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
		</div>
	);
}
