import { Search, X } from 'lucide-react';
import * as React from 'react';
import type { GitHubRepository } from '@/types/github';

export interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	repositories: GitHubRepository[];
	placeholder?: string;
	className?: string;
}

export function SearchInput({
	value,
	onChange,
	repositories,
	placeholder = 'Search...',
	className = '',
}: SearchInputProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

	const suggestions = React.useMemo(() => {
		if (!value.trim()) return [];

		const query = value.toLowerCase();
		return repositories
			.filter((repo) => repo.name.toLowerCase().includes(query))
			.slice(0, 5);
	}, [value, repositories]);

	const handleClear = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		onChange('');
		setIsOpen(false);
		setHighlightedIndex(-1);
		inputRef.current?.focus();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			handleClear();
			setIsOpen(false);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			setIsOpen(true);
			setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			setHighlightedIndex((prev) => Math.max(prev - 1, 0));
		} else if (
			event.key === 'Enter' &&
			highlightedIndex >= 0 &&
			suggestions[highlightedIndex]
		) {
			event.preventDefault();
			onChange(suggestions[highlightedIndex].name);
			setIsOpen(false);
			setHighlightedIndex(-1);
		}
	};

	const handleSelect = (repoName: string) => {
		onChange(repoName);
		setIsOpen(false);
		setHighlightedIndex(-1);
	};

	const highlightMatch = (text: string, query: string) => {
		if (!query.trim()) return text;

		const index = text.toLowerCase().indexOf(query.toLowerCase());
		if (index === -1) return text;

		return (
			<>
				{text.slice(0, index)}
				<span className='font-semibold text-teal-700'>
					{text.slice(index, index + query.length)}
				</span>
				{text.slice(index + query.length)}
			</>
		);
	};

	return (
		<div className={`relative ${className}`}>
			<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
				<Search
					className='h-5 w-5 text-gray-400'
					aria-hidden='true'
				/>
			</div>

			<input
				ref={inputRef}
				type='text'
				inputMode='search'
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
					setIsOpen(true);
					setHighlightedIndex(-1);
				}}
				onKeyDown={handleKeyDown}
				onFocus={() => value.trim() && setIsOpen(true)}
				onBlur={() => setTimeout(() => setIsOpen(false), 150)}
				placeholder={placeholder}
				aria-label='Search repositories by name'
				aria-expanded={isOpen}
				aria-controls='search-suggestions'
				role='combobox'
				autoComplete='off'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck='false'
				className={[
					'w-full rounded-lg border border-gray-300 bg-white placeholder:text-gray-400',
					'py-2.5 pl-10 pr-10 text-sm font-medium min-h-11',
					'text-gray-600 focus:text-gray-700',
					'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-shadow',
					'cursor-text',
					'[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
				].join(' ')}
			/>

			{value && (
				<button
					type='button'
					onClick={handleClear}
					className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
					aria-label='Clear search'
					tabIndex={-1}>
					<X className='h-4 w-4' />
				</button>
			)}

			{isOpen && suggestions.length > 0 && (
				<div
					id='search-suggestions'
					role='listbox'
					className='absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg'>
					{suggestions.map((repo, index) => (
						<button
							key={repo.id}
							type='button'
							role='option'
							aria-selected={index === highlightedIndex}
							onClick={() => handleSelect(repo.name)}
							className={[
								'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors cursor-pointer',
								index === highlightedIndex ?
									'bg-teal-50 text-teal-900'
								:	'text-gray-900 hover:bg-gray-50',
							].join(' ')}>
							<Search
								className='h-4 w-4 shrink-0 text-gray-400'
								aria-hidden='true'
							/>
							<span className='flex-1 truncate'>{highlightMatch(repo.name, value)}</span>
							{repo.language && (
								<span className='text-xs text-gray-500'>{repo.language}</span>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
