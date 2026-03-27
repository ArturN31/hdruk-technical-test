'use client';

import { useSearchParams } from 'next/navigation';
import { useGitHub } from '@/hooks/useGitHub';
import { StatsCard } from './StatsCard';
import { FilterSection } from '@/components/filters';
import { RepoGrid } from './cards/RepoGrid';
import { LoadingState, ErrorState, EmptyState } from './states';
import { ScrollToTop, SectionHeading } from '@/components/common';

export function RepoList() {
	const searchParams = useSearchParams();
	const username = searchParams.get('user') || 'vercel';

	const {
		searchQuery,
		setSearchQuery,
		filterType,
		sortOption,
		languageFilter,
		setFilterType,
		setSortOption,
		setLanguageFilter,
		repositories,
		displayedRepositories,
		filteredCount,
		displayedCount,
		hasMore,
		loadMore,
		isLoading,
		isError,
		errorMessage,
		errorCode,
		refetch,
		totalStars,
		uniqueLanguages,
	} = useGitHub(username);

	const isProcessing = isLoading;
	const isEmpty = !isLoading && !isError && displayedRepositories.length === 0;

	const handleClearFilters = () => {
		setFilterType('all');
		setLanguageFilter('all');
		setSortOption('stars_desc');
		setSearchQuery('');
	};

	return (
		<section
			className='w-full'
			aria-label='Repository browser'>
			<div
				aria-live='polite'
				aria-atomic='true'
				className='sr-only'>
				{isProcessing && 'Loading repositories...'}
				{!isProcessing &&
					!isError &&
					`Showing ${displayedCount} of ${filteredCount} repositories. Total ${totalStars.toLocaleString()} stars across ${uniqueLanguages.length} languages.`}
				{isError && `Error: ${errorMessage}`}
			</div>

			<ScrollToTop />
			<StatsCard
				displayedCount={displayedCount}
				filteredCount={filteredCount}
				totalStars={totalStars}
				uniqueLanguages={uniqueLanguages}
				isLoading={isProcessing}
			/>

			<FilterSection
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				filterType={filterType}
				sortOption={sortOption}
				languageFilter={languageFilter}
				onFilterTypeChange={setFilterType}
				onSortOptionChange={setSortOption}
				onLanguageFilterChange={setLanguageFilter}
				repositories={repositories}
				languages={uniqueLanguages}
			/>

			<div className='bg-white rounded-lg border border-gray-200 shadow-sm'>
				<SectionHeading
					title='Repositories'
					subtitle='Browse and explore projects'
				/>
				<div>
					{isProcessing ?
						<LoadingState />
					: isError ?
						<ErrorState
							errorCode={errorCode}
							errorMessage={errorMessage}
							onRetry={refetch}
						/>
					: isEmpty ?
						<EmptyState onClearFilters={handleClearFilters} />
					:	<RepoGrid
							repositories={displayedRepositories}
							hasMore={hasMore}
							loadMore={loadMore}
						/>
					}
				</div>
			</div>
		</section>
	);
}
