import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { FilterSection } from '@/components/filters/FilterSection/FilterSection';

const mockRepos = [
	{
		id: 1,
		name: 'test',
		description: 'Test',
		language: 'TypeScript',
		stargazers_count: 100,
		html_url: 'https://github.com/user/test',
		has_issues: true,
		has_wiki: true,
		has_pages: false,
		has_downloads: true,
		open_issues_count: 0,
		watchers_count: 100,
		forks_count: 10,
		size: 1000,
		default_branch: 'main',
		created_at: '2024-01-01T00:00:00Z',
		updated_at: '2024-01-15T00:00:00Z',
		pushed_at: '2024-01-15T00:00:00Z',
		homepage: null,
		private: false,
		archived: false,
		disabled: false,
		visibility: 'public',
		license: null,
		topics: [],
	},
];

describe('FilterSection', () => {
	const props = {
		searchQuery: '',
		onSearchChange: vi.fn(),
		filterType: 'all',
		sortOption: 'stars_desc',
		languageFilter: 'all',
		onFilterTypeChange: vi.fn(),
		onSortOptionChange: vi.fn(),
		onLanguageFilterChange: vi.fn(),
		repositories: mockRepos,
		languages: ['TypeScript'],
	};

	it('renders', () => {
		const { container } = render(<FilterSection {...props} />);
		expect(container.querySelector('input')).toBeInTheDocument();
	});

	it('shows badge when filters active', () => {
		const { container } = render(
			<FilterSection
				{...props}
				filterType='popular'
			/>,
		);
		expect(container.textContent).toMatch(/1/);
	});

	it('shows clear button when filters active', () => {
		const { container } = render(
			<FilterSection
				{...props}
				filterType='popular'
			/>,
		);
		expect(container.textContent).toMatch(/Clear/);
	});

	it('toggles advanced filters', () => {
		const { container } = render(<FilterSection {...props} />);
		const buttons = container.querySelectorAll("[aria-label='Show filters']");
		fireEvent.click(buttons[0]);
		expect(container.textContent).toMatch(/All/);
	});

	it('shows filter type chip and removes on click', () => {
		const { container } = render(
			<FilterSection
				{...props}
				filterType='popular'
			/>,
		);
		const chips = container.querySelectorAll('button');
		const chip = Array.from(chips).find((b) => b.textContent?.trim() === 'Popular');
		if (chip) fireEvent.click(chip);
		expect(props.onFilterTypeChange).toHaveBeenCalledWith('all');
	});

	it('shows language filter chip and removes on click', () => {
		const { container } = render(
			<FilterSection
				{...props}
				languageFilter='TypeScript'
			/>,
		);
		const chips = container.querySelectorAll('button');
		const chip = Array.from(chips).find((b) => b.textContent?.trim() === 'TypeScript');
		if (chip) fireEvent.click(chip);
		expect(props.onLanguageFilterChange).toHaveBeenCalledWith('all');
	});

	it('shows sort chip and removes on click', () => {
		const { container } = render(
			<FilterSection
				{...props}
				sortOption='name_asc'
			/>,
		);
		const chips = container.querySelectorAll('button');
		const chip = Array.from(chips).find((b) => b.textContent?.trim() === 'A-Z');
		if (chip) fireEvent.click(chip);
		expect(props.onSortOptionChange).toHaveBeenCalledWith('stars_desc');
	});

	it('shows search query chip and removes on click', () => {
		const { container } = render(
			<FilterSection
				{...props}
				searchQuery='test'
			/>,
		);
		const chips = container.querySelectorAll('button');
		const chip = Array.from(chips).find((b) => b.textContent?.includes('test'));
		if (chip) fireEvent.click(chip);
		expect(props.onSearchChange).toHaveBeenCalledWith('');
	});

	it('calls handleClearAll when clear button clicked', () => {
		const { container } = render(
			<FilterSection
				{...props}
				filterType='popular'
			/>,
		);
		const chips = container.querySelectorAll('button');
		const clearButton = Array.from(chips).find((b) => b.textContent?.trim() === 'Clear');
		if (clearButton) fireEvent.click(clearButton);
		expect(props.onFilterTypeChange).toHaveBeenCalledWith('all');
		expect(props.onLanguageFilterChange).toHaveBeenCalledWith('all');
		expect(props.onSortOptionChange).toHaveBeenCalledWith('stars_desc');
	});

	it('shows advanced filters with TypeFilters', () => {
		const { container } = render(<FilterSection {...props} />);
		const buttons = container.querySelectorAll("[aria-label='Show filters']");
		fireEvent.click(buttons[0]);
		expect(container.textContent).toMatch(/All/);
	});

	it('shows LanguageFilter when languages provided', () => {
		const { container } = render(<FilterSection {...props} />);
		const buttons = container.querySelectorAll("[aria-label='Show filters']");
		fireEvent.click(buttons[0]);
		expect(
			container.querySelector("select[aria-label='Filter by programming language']"),
		).toBeInTheDocument();
	});

	it('hides LanguageFilter when no languages', () => {
		const { container } = render(
			<FilterSection
				{...props}
				languages={[]}
			/>,
		);
		const buttons = container.querySelectorAll("[aria-label='Show filters']");
		fireEvent.click(buttons[0]);
		expect(
			container.querySelector("select[aria-label='Filter by programming language']"),
		).not.toBeInTheDocument();
	});

	it('calls onLanguageFilterChange when language selected', () => {
		const { container } = render(<FilterSection {...props} />);
		const buttons = container.querySelectorAll("[aria-label='Show filters']");
		fireEvent.click(buttons[0]);
		const select = container.querySelector(
			"select[aria-label='Filter by programming language']",
		);
		if (select) fireEvent.change(select, { target: { value: 'TypeScript' } });
		expect(props.onLanguageFilterChange).toHaveBeenCalledWith('TypeScript');
	});

	it('calls onFilterTypeChange when type selected', () => {
		const { container } = render(<FilterSection {...props} />);
		const buttons = container.querySelectorAll("[aria-label='Show filters']");
		fireEvent.click(buttons[0]);
		const descButton = Array.from(container.querySelectorAll('button')).find(
			(b) => b.textContent?.trim() === 'Description',
		);
		if (descButton) fireEvent.click(descButton);
		expect(props.onFilterTypeChange).toHaveBeenCalledWith('with_description');
	});

	it('shows multiple active filters', () => {
		const { container } = render(
			<FilterSection
				{...props}
				filterType='popular'
				languageFilter='TypeScript'
			/>,
		);
		expect(container.textContent).toMatch(/2/);
	});

	it('shows sort badge count', () => {
		const { container } = render(
			<FilterSection
				{...props}
				filterType='popular'
				sortOption='name_asc'
				languageFilter='TypeScript'
			/>,
		);
		expect(container.textContent).toMatch(/3/);
	});
});
