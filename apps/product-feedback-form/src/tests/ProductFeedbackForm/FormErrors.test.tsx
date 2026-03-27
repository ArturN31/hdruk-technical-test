import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormErrors } from '../../components/ProductFeedbackForm/FormErrors';

describe('FormErrors', () => {
	it('should return null when no errors', () => {
		const { container } = render(<FormErrors errors={undefined} />);
		expect(container.firstChild).toBeNull();
	});

	it('should return null when errors is empty array', () => {
		const { container } = render(<FormErrors errors={[]} />);
		expect(container.firstChild).toBeNull();
	});

	it('should render errors with default id', () => {
		render(<FormErrors errors={['Test error']} />);
		expect(screen.getByRole('alert')).toHaveAttribute('id', 'form-errors');
	});

	it('should render errors with custom id', () => {
		render(<FormErrors errors={['Test error']} formId="custom-form" />);
		expect(screen.getByRole('alert')).toHaveAttribute('id', 'custom-form-errors');
	});

	it('should render error messages', () => {
		render(<FormErrors errors={['Error 1', 'Error 2']} />);
		expect(screen.getByText('Error 1')).toBeInTheDocument();
		expect(screen.getByText('Error 2')).toBeInTheDocument();
	});

	it('should have accessibility attributes', () => {
		render(<FormErrors errors={['Test error']} />);
		const alert = screen.getByRole('alert');
		expect(alert).toHaveAttribute('aria-live', 'assertive');
	});
});
