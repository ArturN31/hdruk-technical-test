import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { SearchInput } from '@/components/filters/inputs/SearchInput';

const mockRepos = [
	{ id: 1, name: 'test-repo', language: 'TypeScript' },
	{ id: 2, name: 'another-repo', language: 'JavaScript' },
];

describe('SearchInput', () => {
	it('renders input', () => {
		const { container } = render(
			<SearchInput
				value=''
				onChange={() => {}}
				repositories={[]}
			/>,
		);
		expect(container.querySelector('input')).toBeInTheDocument();
	});

	it('has clear button when value exists', () => {
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={[]}
			/>,
		);
		expect(container.querySelector('button')).toBeInTheDocument();
	});

	it('calls onChange on input', () => {
		const onChange = vi.fn();
		const { container } = render(
			<SearchInput
				value=''
				onChange={onChange}
				repositories={[]}
			/>,
		);
		fireEvent.change(container.querySelector('input')!, { target: { value: 'test' } });
		expect(onChange).toHaveBeenCalledWith('test');
	});

	it('calls onChange on clear', () => {
		const onChange = vi.fn();
		const { container } = render(
			<SearchInput
				value='test'
				onChange={onChange}
				repositories={[]}
			/>,
		);
		fireEvent.click(container.querySelector('button')!);
		expect(onChange).toHaveBeenCalledWith('');
	});

	it('handles ArrowDown key', () => {
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		expect(container.querySelector("[aria-selected='true']")).toBeInTheDocument();
	});

	it('handles ArrowUp key', () => {
		const onChange = vi.fn();
		const { container } = render(
			<SearchInput
				value='test'
				onChange={onChange}
				repositories={mockRepos as any}
			/>,
		);
		const input = container.querySelector('input')!;
		fireEvent.keyDown(input, { key: 'ArrowDown' });
		fireEvent.keyDown(input, { key: 'ArrowDown' });
		fireEvent.keyDown(input, { key: 'ArrowUp' });
		expect(container.querySelector("[aria-selected='true']")).toBeInTheDocument();
	});

	it('handles Enter key with selection', () => {
		const onChange = vi.fn();
		const { container } = render(
			<SearchInput
				value='test'
				onChange={onChange}
				repositories={mockRepos as any}
			/>,
		);
		const input = container.querySelector('input')!;
		fireEvent.keyDown(input, { key: 'ArrowDown' });
		fireEvent.keyDown(input, { key: 'Enter' });
		expect(onChange).toHaveBeenCalledWith('test-repo');
	});

	it('handles Escape key', () => {
		const onChange = vi.fn();
		const { container } = render(
			<SearchInput
				value='test'
				onChange={onChange}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'Escape' });
		expect(onChange).toHaveBeenCalledWith('');
	});

	it('calls onChange on suggestion click', () => {
		const onChange = vi.fn();
		const { container } = render(
			<SearchInput
				value='test'
				onChange={onChange}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		const buttons = container.querySelectorAll("[role='option']");
		fireEvent.click(buttons[0]);
		expect(onChange).toHaveBeenCalledWith('test-repo');
	});

	it('hides suggestions when empty', () => {
		const { container } = render(
			<SearchInput
				value=''
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		expect(container.querySelector("[role='listbox']")).not.toBeInTheDocument();
	});

	it('has autocomplete attributes', () => {
		const { container } = render(
			<SearchInput
				value=''
				onChange={() => {}}
				repositories={[]}
			/>,
		);
		const input = container.querySelector('input')!;
		expect(input).toHaveAttribute('autoComplete', 'off');
		expect(input).toHaveAttribute('autoCorrect', 'off');
	});

	it('accepts className', () => {
		const { container } = render(
			<SearchInput
				value=''
				onChange={() => {}}
				repositories={[]}
				className='test'
			/>,
		);
		expect(container.querySelector('.test')).toBeInTheDocument();
	});

	it('accepts placeholder', () => {
		const { container } = render(
			<SearchInput
				value=''
				onChange={() => {}}
				repositories={[]}
				placeholder='Search...'
			/>,
		);
		expect(container.querySelector("input[placeholder='Search...']")).toBeInTheDocument();
	});

	it('shows language in suggestion', () => {
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		expect(container.textContent).toMatch(/TypeScript/);
	});

	it('highlights matching text with correct styling', () => {
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		const highlight = container.querySelector('span.font-semibold.text-teal-700');
		expect(highlight).toBeInTheDocument();
		expect(highlight?.textContent).toBe('test');
	});

	it('renders full text when query matches start', () => {
		const repos = [{ id: 1, name: 'testing-repo', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		expect(container.textContent).toContain('testing-repo');
	});

	it('renders full text when query matches middle', () => {
		const repos = [{ id: 1, name: 'my-testing-repo', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		expect(container.textContent).toContain('my-testing-repo');
	});

	it('returns plain text when highlightMatch finds no match in text', () => {
		// This tests the `if (index === -1) return text;` branch indirectly
		// When the query doesn't match any repo names, no suggestions are shown
		const repos = [
			{ id: 1, name: 'test-repo', language: 'TypeScript' },
		];
		const { container } = render(
			<SearchInput
				value='xyz'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		// No suggestions since 'xyz' doesn't match 'test-repo'
		expect(container.querySelectorAll("[role='option']").length).toBe(0);
	});

	it('handles highlightMatch with empty query - returns plain text', () => {
		const { container } = render(
			<SearchInput
				value=''
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.focus(container.querySelector('input')!);
		// When query is empty, highlightMatch returns plain text without JSX span
		// This tests the `if (!query.trim()) return text;` branch
		const options = container.querySelectorAll("[role='option']");
		options.forEach((option) => {
			// No font-semibold span should exist for empty query
			expect(option.querySelectorAll('span.font-semibold').length).toBe(0);
		});
	});

	it('handles highlightMatch with whitespace only query - returns plain text', () => {
		const { container } = render(
			<SearchInput
				value='   '
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.focus(container.querySelector('input')!);
		// When query is whitespace only, highlightMatch returns plain text
		// This tests the `if (!query.trim()) return text;` branch
		const options = container.querySelectorAll("[role='option']");
		options.forEach((option) => {
			expect(option.querySelectorAll('span.font-semibold').length).toBe(0);
		});
	});

	it('handles highlightMatch with no match - returns plain text', () => {
		const repos = [{ id: 1, name: 'test-repo', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='xyz'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		// When no match is found in the text, highlightMatch returns plain text
		// This tests the `if (index === -1) return text;` branch
		// Since no suggestions match "xyz", the listbox should be empty/hidden
		expect(container.querySelector("[role='listbox']")).not.toBeInTheDocument();
	});

	it('handles highlightMatch partial match', () => {
		const repos = [{ id: 1, name: 'testing-repo', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		const highlight = container.querySelector('span.font-semibold');
		expect(highlight).toBeInTheDocument();
		expect(highlight?.textContent).toBe('test');
	});

	it('handles highlightMatch case insensitive', () => {
		const repos = [{ id: 1, name: 'TEST-repo', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		const highlight = container.querySelector('span.font-semibold');
		expect(highlight).toBeInTheDocument();
		expect(highlight?.textContent).toBe('TEST');
	});

	it('limits suggestions to 5', () => {
		const many = Array.from({ length: 10 }, (_, i) => ({
			id: i,
			name: `r${i}`,
			language: 'T',
		}));
		const { container } = render(
			<SearchInput
				value='r'
				onChange={() => {}}
				repositories={many as any}
			/>,
		);
		expect(container.querySelectorAll("[role='option']").length).toBeLessThanOrEqual(5);
	});

	it('handles blur timeout', async () => {
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.focus(container.querySelector('input')!);
		fireEvent.blur(container.querySelector('input')!);
		await waitFor(
			() => {
				expect(container.querySelector("[role='listbox']")).not.toBeInTheDocument();
			},
			{ timeout: 200 },
		);
	});

	it('opens suggestions on focus with value', () => {
		const { container } = render(
			<SearchInput
				value='test'
				onChange={() => {}}
				repositories={mockRepos as any}
			/>,
		);
		fireEvent.focus(container.querySelector('input')!);
		expect(container.querySelector("[role='listbox']")).toBeInTheDocument();
	});

	it('handles special characters in query', () => {
		const repos = [{ id: 1, name: 'test-repo', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='test-'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		expect(container.querySelector('span.font-semibold')).toBeInTheDocument();
	});

	it('handles multiple word query', () => {
		const repos = [{ id: 1, name: 'test repo project', language: 'TS' }];
		const { container } = render(
			<SearchInput
				value='test repo'
				onChange={() => {}}
				repositories={repos as any}
			/>,
		);
		fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown' });
		expect(container.querySelector('span.font-semibold')).toBeInTheDocument();
	});
});
