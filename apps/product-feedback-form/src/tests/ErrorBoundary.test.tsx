import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

describe('ErrorBoundary', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render children when no error', () => {
		render(
			<ErrorBoundary>
				<div>Child content</div>
			</ErrorBoundary>,
		);
		expect(screen.getByText('Child content')).toBeInTheDocument();
	});

	it('should render fallback when error occurs', async () => {
		render(
			<ErrorBoundary fallback={<div>Custom fallback</div>}>
				<div>Child content</div>
			</ErrorBoundary>,
		);

		act(() => {
			window.dispatchEvent(new ErrorEvent('error', { error: new Error('Test error') }));
		});

		await waitFor(() => {
			expect(screen.getByText('Custom fallback')).toBeInTheDocument();
		});
	});

	it('should render default error UI when error occurs without fallback', async () => {
		render(
			<ErrorBoundary>
				<div>Child content</div>
			</ErrorBoundary>,
		);

		act(() => {
			window.dispatchEvent(
				new ErrorEvent('error', { error: new Error('Test error message') }),
			);
		});

		await waitFor(() => {
			expect(screen.getByText('Something went wrong')).toBeInTheDocument();
			expect(screen.getByText('Test error message')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
		});
	});

	it('should handle error with message string when error is not an Error instance', () => {
		const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

		render(
			<ErrorBoundary>
				<div>Child content</div>
			</ErrorBoundary>,
		);

		const errorEventHandler = addEventListenerSpy.mock.calls.find(
			(call) => call[0] === 'error',
		)?.[1] as (event: ErrorEvent) => void;

		const mockErrorEvent = {
			error: {},
			message: 'Error message',
		} as unknown as ErrorEvent;

		act(() => {
			errorEventHandler(mockErrorEvent);
		});

		expect(screen.getByText('Something went wrong')).toBeInTheDocument();
		expect(screen.getByText('Error message')).toBeInTheDocument();

		addEventListenerSpy.mockRestore();
	});

	it('should show fallback message when error has no message', async () => {
		const errorWithoutMessage = new Error();
		Object.defineProperty(errorWithoutMessage, 'message', { value: '' });

		render(
			<ErrorBoundary>
				<div>Child content</div>
			</ErrorBoundary>,
		);

		act(() => {
			window.dispatchEvent(new ErrorEvent('error', { error: errorWithoutMessage }));
		});

		await waitFor(() => {
			expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
		});
	});

	it.each([
		{
			reason: new Error('Promise error'),
			expectedText: 'Promise error',
			description: 'Error',
		},
		{ reason: 'String error', expectedText: 'String error', description: 'string' },
		{
			reason: { unknown: 'type' },
			expectedText: 'An unknown error occurred',
			description: 'unknown type',
		},
	])(
		'should handle unhandled promise rejection with $description',
		async ({ reason, expectedText }) => {
			const rejectionEvent = new CustomEvent('unhandledrejection');
			Object.defineProperty(rejectionEvent, 'reason', { value: reason });

			render(
				<ErrorBoundary>
					<div>Child content</div>
				</ErrorBoundary>,
			);

			act(() => {
				window.dispatchEvent(rejectionEvent);
			});

			await waitFor(() => {
				expect(screen.getByText('Something went wrong')).toBeInTheDocument();
				expect(screen.getByText(expectedText)).toBeInTheDocument();
			});
		},
	);

	it('should reset error when Try again button is clicked', async () => {
		render(
			<ErrorBoundary>
				<div>Child content</div>
			</ErrorBoundary>,
		);

		act(() => {
			window.dispatchEvent(new ErrorEvent('error', { error: new Error('Test error') }));
		});

		await waitFor(() => {
			expect(screen.getByText('Something went wrong')).toBeInTheDocument();
		});

		fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

		await waitFor(() => {
			expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
			expect(screen.getByText('Child content')).toBeInTheDocument();
		});
	});

	it('should clean up event listeners on unmount', () => {
		const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

		const { unmount } = render(
			<ErrorBoundary>
				<div>Child content</div>
			</ErrorBoundary>,
		);

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			'unhandledrejection',
			expect.any(Function),
		);

		removeEventListenerSpy.mockRestore();
	});
});
