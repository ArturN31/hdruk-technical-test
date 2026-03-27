import { X, ChevronDown, Filter } from 'lucide-react';
import * as React from 'react';
import type { GitHubRepository } from '@/lib/github-schemas';
import { SearchInput, SortSelect, TypeFilters } from '../inputs';
import { LanguageFilter } from '../LanguageFilter';

export interface FilterSectionProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	filterType: string;
	sortOption: string;
	languageFilter: string;
	onFilterTypeChange: (value: string) => void;
	onSortOptionChange: (value: string) => void;
	onLanguageFilterChange: (value: string) => void;
	repositories: GitHubRepository[];
	languages: string[];
}

const filterLabels: Record<string, string> = {
	all: 'All',
	with_description: 'Description',
	popular: 'Popular',
	has_issues: 'Issues',
	has_wiki: 'Wiki',
	with_readme: 'README',
};
const sortLabels: Record<string, string> = {
	stars_desc: 'Most Stars',
	stars_asc: 'Fewest Stars',
	name_asc: 'A-Z',
	name_desc: 'Z-A',
};

export function FilterSection({
	searchQuery,
	onSearchChange,
	filterType,
	sortOption,
	languageFilter,
	onFilterTypeChange,
	onSortOptionChange,
	onLanguageFilterChange,
	repositories,
	languages,
}: FilterSectionProps) {
	const [showAdvanced, setShowAdvanced] = React.useState(false);

	const activeFilterCount = React.useMemo(
		() =>
			[filterType, languageFilter, sortOption].filter(
				(f) => f !== 'all' && f !== 'stars_desc',
			).length,
		[filterType, languageFilter, sortOption],
	);

	const activeFilters = React.useMemo(() => {
		const filters: { id: string; label: string; onRemove: () => void }[] = [];
		if (filterType !== 'all')
			filters.push({
				id: 'type',
				label: filterLabels[filterType],
				onRemove: () => onFilterTypeChange('all'),
			});
		if (languageFilter !== 'all')
			filters.push({
				id: 'language',
				label: languageFilter,
				onRemove: () => onLanguageFilterChange('all'),
			});
		if (sortOption !== 'stars_desc')
			filters.push({
				id: 'sort',
				label: sortLabels[sortOption],
				onRemove: () => onSortOptionChange('stars_desc'),
			});
		return filters;
	}, [
		filterType,
		languageFilter,
		sortOption,
		onFilterTypeChange,
		onLanguageFilterChange,
		onSortOptionChange,
	]);

	const hasActiveFilters = activeFilters.length > 0 || searchQuery.trim();
	const handleClearAll = () => {
		onFilterTypeChange('all');
		onLanguageFilterChange('all');
		onSortOptionChange('stars_desc');
	};

	return (
		<div className='bg-white rounded-lg border border-gray-200 p-5 mb-6 shadow-sm'>
			<div className='mb-4'>
				<h2 className='text-base font-semibold text-gray-900'>Filters & Search</h2>
				<p className='text-sm text-gray-500 mt-0.5'>Refine and find repositories</p>
			</div>

			<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
				<div className='flex-1 min-w-0'>
					<SearchInput
						value={searchQuery}
						onChange={onSearchChange}
						repositories={repositories}
						placeholder='Search repositories...'
						className='w-full'
					/>
				</div>

				<div className='flex items-center gap-2 shrink-0'>
					<SortSelect
						value={sortOption}
						onChange={onSortOptionChange}
					/>

					<button
						type='button'
						onClick={() => setShowAdvanced(!showAdvanced)}
						className={[
							'inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 bg-white transition-colors cursor-pointer min-h-11',
							showAdvanced || activeFilterCount > 0 ?
								'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100'
							:	'text-gray-600 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-400',
						].join(' ')}
						aria-expanded={showAdvanced}
						aria-label={showAdvanced ? 'Hide filters' : 'Show filters'}>
						<Filter className='h-5 w-5 shrink-0' />
						<span className='whitespace-nowrap'>Filters</span>
						{activeFilterCount > 0 && (
							<span className='inline-flex items-center justify-center rounded-full bg-teal-600 px-1.5 py-0.5 text-xs font-semibold text-white min-w-5'>
								{activeFilterCount}
							</span>
						)}
						<ChevronDown
							className={`h-5 w-5 shrink-0 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
						/>
					</button>

					{hasActiveFilters && (
						<button
							type='button'
							onClick={handleClearAll}
							className='inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 bg-white min-h-11 text-gray-600 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer'
							aria-label='Clear all filters'>
							Clear
						</button>
					)}
				</div>
			</div>

			{hasActiveFilters && (
				<div className='flex flex-wrap items-center gap-2 px-5 py-2'>
					{activeFilters.map((filter) => (
						<button
							key={filter.id}
							type='button'
							onClick={filter.onRemove}
							className='inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 hover:bg-teal-100 transition-colors cursor-pointer'>
							{filter.label}
							<X className='h-3 w-3' />
						</button>
					))}
					{searchQuery.trim() && (
						<button
							type='button'
							onClick={() => onSearchChange('')}
							className='inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 hover:bg-teal-100 transition-colors cursor-pointer'>
							&quot;{searchQuery.trim()}&quot;
							<X className='h-3 w-3' />
						</button>
					)}
				</div>
			)}

			{showAdvanced && (
				<div className='border-t border-gray-100 px-5 py-4'>
					<div className='flex flex-col gap-4'>
						<TypeFilters
							value={filterType}
							onChange={onFilterTypeChange}
						/>
						{languages.length > 0 && (
							<LanguageFilter
								languages={languages}
								value={languageFilter}
								onChange={onLanguageFilterChange}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
